import AddTutorial from "../components/AddTutorial";
import TutorialList from "../components/TutorialList";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [tutorials, setTutorials] = useState();
  const url = "https://cw-axios-example.herokuapp.com/api/tutorials";

  //!Get islemi (Read)
  const getTutorials = async () => {
    try {
      const { data } = await axios.get(url);
      setTutorials(data);
    } catch (error) {
      console.log(error);
    }
  };

  //*Sadece Companenet mount oldugunda istek yapar
  useEffect(() => {
    getTutorials();
  }, []);

  console.log(tutorials);

  //!Post islemi yapacagiz  (Create)
  const addTutorial = async (tutorial) => {
    try {
      await axios.post(url,tutorial)
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };



  return (
    <>
      <AddTutorial addTutorial={addTutorial} />
      <TutorialList tutorials={tutorials} />
      {/* <TutorialList {...tutorials} /> */}
    </>
  );
};

export default Home;
