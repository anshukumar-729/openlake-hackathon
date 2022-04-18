const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const cors = require("cors");
const { Blogs } = require("./models/userSchema");
const { Lost } = require("./models/userSchema");
const { Courses } = require("./models/userSchema");
const { CommonRoom } = require("./models/userSchema");
const { AlumniInteraction } = require("./models/userSchema");
const { response } = require("express");
const Crypto = require("crypto-js");
// const {conn} = require("./db/conn");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride("_method"));
dotenv.config({ path: "../config.env" });
const port = process.env.PORT || 3020;
require("./db/conn");
let gfs, gridfsBucket;
DB = process.env.DB;
const conn = mongoose.createConnection(DB);

conn.once("open", () => {
  // Init stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
 
});
var filename="";
const storage = new GridFsStorage({
  url: DB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
         filename = buf.toString("hex") + path.extname(file.originalname);
        console.log(filename)
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
var files2;
app.get("/", async (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.json({ files: false });
    } else {
      files.map((file) => {
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
     
     
    }
    files2=files
  });
   try {
     result = await Lost.find({});
    //  console.log(result)
     res.json({ status: "ok", result: result, files: files2 });
   } catch (err) {
     console.log(err);
     res.send(err);
   }
});
app.post("/upload", upload.single("file"), async (req, res) => {
  // res.json({ file: req.file });
  
    var dt = new Date();
    var tm = dt.toLocaleTimeString();
    if(!filename){
      filename = Crypto.SHA256(11).toString();
    }
  try {

        const lost = await Lost.create({
          itemName: req.body.item,
          phone: req.body.phone,
          itemPhoto:filename,
          email:req.body.email,
          date:dt,
          isReceived: false,
          founderName: req.body.founderName,
          receiverName: req.body.receiverName,
          photo: req.body.photo,
        });


     res.redirect(req.body.url);
  } catch (err) {
    console.log(err);
    res.send(err);
  }

 
  
});
app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // Files exist
    return res.json(files);
  });
});
app.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // File exists
    return res.json(file);
  });
});
app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(res);

    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});
/// courses #################################################################33
app.post("/api/courses/register", async (req, res) => {
  try {
    no = await Blogs.find({ courseCode: req.body.courseCode }).count();
    if (no != 0) {
      res.json({ messege: "duplicate entry" });
    } else {
      try {
        const course = await Courses.create({
          courseName: req.body.courseName,
          courseCode: req.body.courseCode,
          credits:req.body.credits,
          instructorName: req.body.instructorName,
          about: req.body.about,
        });

        result = await Courses.find({});
        res.json({ status: "ok", result: result });
        try {
          const blog = await Blogs.create({
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            credits: req.body.credits,
            instructorName: req.body.instructorName,
            about: req.body.about,
            review: [],
            forum: [],
          });
        } catch (err) {
          console.log(err);
          res.send(err);
        }
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    }
  } catch (err) {
    res.send(err);
  }
});
app.get("/api/courses/read", async (req, res) => {
  try {
    result = await Courses.find({});
    res.json({ status: "ok", result: result });
  } catch (err) {
    res.send(err);
  }
});
app.get("/api/courseDetail/:code", async (req, res) => {
  try {
    result = await Blogs.find({courseCode:req.params.code});
    res.json({ status: "ok", result: result });
  } catch (err) {
    res.send(err);
  }
});

app.post("/api/courses/review/add", async (req, res) => {
  var code = req.body.courseCode;
  try {
    const course = await Blogs.update(
      { courseCode: code },
      {
        $push: {
          review: {
            bloggerBatch: req.body.bloggerBatch,
            blog: req.body.blog,
            photo:req.body.photo,
            bloggerName: req.body.bloggerName,
          },
        },
      }
    );

    result = await Blogs.find({courseCode:code});
    res.json({ status: "ok", result: result });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
app.post("/api/courses/forum/add", async (req, res) => {
  var dt = new Date();
  var tm = dt.toLocaleTimeString();
  var code = req.body.courseCode;
  try {
    const course = await Blogs.update(
      { courseCode: code },
      {
        $push: {
          forum: {
            date: dt,
            blog: req.body.blog,
            photo:req.body.photo,
            bloggerName: req.body.bloggerName,
          },
        },
      }
    );

    result = await Blogs.find({});
    res.json({ status: "ok", result: result });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
app.get("/api/courses/blog/read/:code", async (req, res) => {
  var code = req.params.code;

  try {
    result = await Blogs.find({ courseCode: code });
    res.json({ status: "ok", result: result });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

/// lost and found ###################################################################3333


app.get("/delete/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const lost = await Lost.updateMany(
      {
        itemPhoto: req.params.id,
      },
      {
        $set: {
          isReceived: true,
        },
      }
    );

    result = await Lost.find({});
    res.json({ status: "ok", result: result });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

/// Common room ######################################################################3333
app.post("/api/common/add", async (req, res) => {
  var dt = new Date();
  var tm = dt.toLocaleTimeString();
  try {
    const common = await CommonRoom.create({
     personName: req.body.personName,
  message: req.body.message,
  photo:req.body.photo,
  date:dt
    });

    result = await CommonRoom.find({});
    res.json({ status: "ok", result: result });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
app.get("/api/common/read", async (req, res) => {
  try {
   
    result = await CommonRoom.find({});
    res.json({ status: "ok", result: result });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

/// Alumni interaction  ######################################################################3333
app.post("/api/alumni/add", async (req, res) => {
  try {
    const alumni = await AlumniInteraction.create({
     alumniName: req.body.alumniName,
  message: req.body.messege,
  date:req.body.date
    });

    result = await AlumniInteraction.find({});
    res.json({ status: "ok", result: result });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


app.get("/hello", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`connection is setup at http://localhost:${port}`);
});
