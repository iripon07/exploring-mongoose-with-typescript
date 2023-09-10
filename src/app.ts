import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { Schema, model } from "mongoose";

const app: Application = express();

// using cors
app.use(cors());

//parse data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  // inserting a test a data mongodb
  /*
    step1. Interface
    step2. Schema,
    step3. Model,
    step4. Database Query
      */

  //   res.send("Hello World!");
  //   next();
  // Creating Interface

  interface IUser {
    id: string;
    role: "student";
    password: string;
    name: {
      firstName: string;
      middleName?: string;
      lastName: string;
    };
    dateOfBirth?: string;
    gender: "male" | "female";
    email?: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
  }
  //Creating Schema using interface
  const userSchema = new Schema<IUser>({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    dateOfBirth: {
      type: String
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    email: {
      type: String,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
  });

  const User = model<IUser>("User", userSchema);
  const createUserToDB = async () => {
    const user = new User({
      id: 101,
      role: "Footballer",
      password: "123456",
      name: {
        firstName: "Tanmoy",
        lastName: "Das",
      },
      gender: "male",
      contactNo: "0111111",
      emergencyContactNo: "011",
      presentAddress: "Brazil",
      permanentAddress: "Africa",
    });
    await user.save();
    console.log(user);
  };
  createUserToDB();
});

export default app;
