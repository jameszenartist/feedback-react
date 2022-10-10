import { createContext, useState, useEffect } from "react";
import easyDB from "easydb-io";
import { v4 as uuid } from "uuid";

const db = easyDB({
  database: process.env.REACT_APP_EASYDB_DB,
  token: process.env.REACT_APP_EASYDB_TOKEN,
});

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback
  const fetchFeedback = async () => {
    // const response = await fetch(
    //   //url syntax from json-server:
    //   `/feedback?_sort=id&_order=desc`
    // );
    // const data = await response.json();

    // setFeedback(data);
    // setIsLoading(false);
    const data = await db.list();
    console.log("the data is: ", data);
    setFeedback(Object.values(data));
    setIsLoading(false);
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    // const response = await fetch("/feedback", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newFeedback),
    // });

    // const data = await response.json();
    // setFeedback([data, ...feedback]);
    const id = uuid();
    const feedbackToAdd = { ...newFeedback, id };
    await db.put(id, feedbackToAdd);

    setFeedback([...feedback, feedbackToAdd]);
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    // if (window.confirm("Are you sure you want to delete?")) {
    //   await fetch(`/feedback/${id}`, {
    //     method: "DELETE",
    //   });
    //   setFeedback(feedback.filter((item) => item.id !== id));
    // }
    if (window.confirm("Are you sure you want to delete?")) {
      await db.delete(id);

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Update feedback item:
  const updateFeedback = async (id, updItem) => {
    // const response = await fetch(`/feedback/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updItem),
    // });

    // const data = await response.json();
    // setFeedback(
    //   feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    // );

    const updatedFeedback = { ...updItem, id };
    await db.put(id, updatedFeedback);

    setFeedback(
      feedback.map((item) => (item.id === id ? updatedFeedback : item))
    );

    // FIX: this fixes being able to add a feedback after editing
    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
export default FeedbackContext;
