import AddTutorial from "../components/AddTutorial";
import TutorialList from "../components/TutorialList";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [tutorials, setTutorials] = useState();
  const url = process.env.REACT_APP_URL;

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
      await axios.post(url, tutorial);
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };
  //!Delete islemi
  const deleteTutorial = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };
  const deleteAllTutorials = async () => {
    try {
      await axios.delete(`${url}`);
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  //!Edit (Put:Whole)
  const editTutorial = async (id, title, desc) => {
    const filtered = tutorials
      .filter((tutor) => tutor.id === id)
      .map(() => ({ title: title, description: desc }));
    //*return yerine paranteze aldik
    console.log(filtered);
    try {
      await axios.put(`${url}/${id}`, filtered[0]);
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  return (
    <>
      <AddTutorial
        addTutorial={addTutorial}
        deleteAllTutorials={deleteAllTutorials}
      />
      <TutorialList
        tutorials={tutorials}
        deleteTutorial={deleteTutorial}
        editTutorial={editTutorial}
      />
      {/* <TutorialList {...tutorials} /> */}
    </>
  );
};

export default Home;
