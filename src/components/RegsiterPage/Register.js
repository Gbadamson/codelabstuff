import { Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { app } from "../base";

const userData = app.firestore().collection("user");
const StudentReg = () => {
  const till = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [displayAvatar, setDisplayAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const [displayCover, setDisplayCover] = useState(null);
  const [interest, setInterest] = useState("");
  const [prof, setProf] = useState("");

  const onAvatar = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = await storageRef.child(file.name);
    await fileRef.put(file);
    setAvatar(await fileRef.getDownloadURL());
  };

  const onDisplayAvatar = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setDisplayAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDisplayCover = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setDisplayCover(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onCover = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = await storageRef.child(file.name);
    await fileRef.put(file);
    setCover(await fileRef.getDownloadURL());
  };

  const StudentRegistration = async () => {
    await userData.doc().set({
      name,
      email,
      interest,
      avatar,
      cover,
      prof,
    });
  };

  return (
    <div>
      <center>
        <div>Welcome to the Registration Page</div>
        <br />
        <br /> <div>Your Content goes here</div>
      </center>
      <center style={{ display: "flex" }}>
        <div>
          <br />
          <br />
          <br />

          <br />
          <label htmlFor="input">Change an Avatar</label>
          <Input
            htmlFor="input"
            type="file"
            onChange={(onAvatar, onDisplayAvatar)}
            style={{
              marginBottom: "10px",
              width: "200px",
            }}
          />
          <div
            style={{
              backgroundColor: "gold",
              width: "200px",
              height: "200px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt="avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            ) : (
              <div>Display Avatar</div>
            )}
          </div>
          {displayAvatar ? (
            <Button
              type="primary"
              danger
              style={{
                width: "200px",
                marginTop: "5px",
              }}
              onClick={() => {
                setDisplayAvatar(null);
              }}
            >
              Reset
            </Button>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            marginTop: "200px",
          }}
        >
          <div>
            <label htmlFor="input">Name: </label>
            <Input
              htmlFor="input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              style={{
                marginBottom: "10px",
                width: "200px",
              }}
            />
            <div>
              <label htmlFor="input">Email: </label>
              <Input
                htmlFor="input"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{
                  marginBottom: "10px",
                  width: "200px",
                }}
              />
            </div>
            <div>
              <label htmlFor="input">Course: </label>
              <Input
                htmlFor="input"
                type="text"
                value={interest}
                placeholder="Web Development, Mobile Development, AI/ML"
                onChange={(e) => {
                  setInterest(e.target.value);
                }}
                style={{
                  marginBottom: "10px",
                  width: "200px",
                }}
              />
            </div>
            <div>
              <label htmlFor="input">Brief: </label>
              <Input
                htmlFor="input"
                type="textArea"
                value={prof}
                onChange={(e) => {
                  setProf(e.target.value);
                }}
                style={{
                  marginBottom: "10px",
                  width: "200px",
                }}
              />
            </div>
          </div>
        </div>
      </center>
      <center>
        <Button
          onClick={() => {
            StudentRegistration(), till.push("/det");
          }}
        >
          Submit
        </Button>
      </center>
    </div>
  );
};

export default StudentReg;
