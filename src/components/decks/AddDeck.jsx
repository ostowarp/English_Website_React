// import servicess:
import {
  getCategories,
  addCategory,
  createDeck,
  updateDeck,
} from "../../servicess";

// import languages:
import { languages } from "../../contexts/data";

import { useEffect, useRef, useState } from "react";
import styles from "../../Style/decks/AddDeck.module.css";

// import icons:
import closeicon from "../../assets/icons/close.svg";
import addicon from "../../assets/icons/add.svg";

// import components:
import { CustomCheckBox } from "../";
import Grid from "@mui/material/Grid2";

// import golobal state:
import useTokenStore from "../../store/useTokenstate";
import { useNavigate } from "react-router-dom";

export default function AddDeck({
  handleClose,
  isUpdate,
  deckData,
  handleUpdate,
}) {
  const { token } = useTokenStore();
  const [isAddInputVisible, setAddInputVisible] = useState(false);
  const inputRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [isAdded, setAdded] = useState(false);
  const navigate = useNavigate();

  // Load categories and set initial values if isUpdate is true
  useEffect(() => {
    const loadInitialData = async () => {
      if (isUpdate && deckData) {
        setSelectedCategories(deckData.categories.map((cat) => cat.name));
        setNewCategory({ name: "" });
      }
    };
    loadInitialData();
  }, [isUpdate, deckData]);

  // Load categories
  const loadCategories = async () => {
    try {
      const { data: categoriesdata } = await getCategories(token);
      setCategories(categoriesdata);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return; // بررسی مقدار خالی

    try {
      const response = await addCategory(token, newCategory);
      const addedCategory = response?.data;
      if (addedCategory) {
        setNewCategory("");
        setAdded(!isAdded);
        setAddInputVisible(false);
      } else {
        console.error("No data returned from addCategory");
      }
    } catch (error) {
      console.log("Error adding category", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    loadCategories();
  }, [isAdded]);

  const handleCheckboxChange = (label) => {
    setSelectedCategories((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // جلوگیری از رفتار پیش‌فرض فرم
      handleAddCategory();
    }
  };

  const handleAddInput = () => {
    setAddInputVisible(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Create or Update deck
  const handleCreateDeck = (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.target);
    const deckInfo = Object.fromEntries(formData);

    // Default values for name and description
    deckInfo.name = deckInfo.name === "" ? "New Deck" : deckInfo.name;
    deckInfo.description =
      deckInfo.description === "" ? "..." : deckInfo.description;

    // Add categories
    deckInfo.category_ids = categories
      .filter((cat) => selectedCategories.includes(cat.name))
      .map((cat) => cat.id);

    const createNewDeck = async () => {
      try {
        const { data: newdeckdata } = await createDeck(token, deckInfo);
        console.log(newdeckdata);

        navigate(`/decks/${newdeckdata.id}`);
        handleClose();
      } catch (error) {
        console.log(error.message);
      }
    };

    const updateExistingDeck = async () => {
      try {
        const { data: updatedeckdata } = await updateDeck(
          token,
          deckInfo,
          deckData.id
        );
        handleUpdate();
        handleClose();
      } catch (error) {
        console.log(error.message);
      }
    };

    if (isUpdate) {
      updateExistingDeck();
    } else {
      createNewDeck();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <form onSubmit={handleCreateDeck} action="">
            <Grid container spacing={2} style={{ margin: "2rem 2rem" }}>
              <Grid size={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "2.4rem",
                      fontFamily: "var(--rooney-Heavy)",
                    }}
                  >
                    {isUpdate ? "Edit Deck" : "New Deck"}
                  </h3>
                  <img
                    onClick={() => handleClose()}
                    src={closeicon}
                    alt="close"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </Grid>

              <Grid container size={12}>
                <Grid style={{ position: "relative" }} size={12}>
                  <input
                    name="name"
                    type="text"
                    className={styles.input}
                    placeholder="Name"
                    defaultValue={isUpdate ? deckData?.name : ""}
                  />
                </Grid>
                <Grid
                  style={{ position: "relative", height: "4.8rem" }}
                  size={12}
                >
                  <select
                    name="language"
                    className={styles.select}
                    defaultValue={deckData?.language || ""}
                  >
                    {!isUpdate && (
                      <option value="" disabled>
                        Select a language
                      </option>
                    )}
                    {languages.map((lang) => (
                      <option
                        key={lang.label}
                        className={styles.option}
                        value={lang.label}
                      >
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </Grid>
                <Grid size={12}>
                  <h3
                    style={{
                      fontSize: "1.6rem",
                      fontFamily: "var(--rooney-Heavy)",
                      color: "var(--gray-hard)",
                    }}
                  >
                    Category:
                  </h3>
                </Grid>
                <Grid
                  className={styles.checkboxgroup}
                  style={{ position: "relative" }}
                  size={12}
                >
                  {categories.map((category) => (
                    <CustomCheckBox
                      key={category.id}
                      label={category.name}
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCheckboxChange(category.name)}
                    />
                  ))}
                  {isAddInputVisible ? (
                    // Start of Selection
                    <>
                      <input
                        ref={inputRef}
                        type="text"
                        className={styles.addinput}
                        onKeyDown={handleKeyDown}
                        onChange={(e) =>
                          setNewCategory({ name: e.target.value })
                        }
                        placeholder="New category"
                      />
                      <p
                        onClick={() => {
                          handleAddCategory();
                        }}
                        className={styles.add}
                      >
                        Add
                      </p>
                    </>
                  ) : (
                    <span
                      onClick={() => {
                        setAddInputVisible(true);
                        setTimeout(() => {
                          inputRef.current.focus();
                        }, 0);
                      }}
                      className={styles.add}
                    >
                      <p>Add</p>
                      <img src={addicon} alt="" />
                    </span>
                  )}
                </Grid>

                <Grid size={12} style={{ height: "14rem" }}>
                  <textarea
                    name="description"
                    className={styles.description}
                    placeholder="Description...."
                    defaultValue={isUpdate ? deckData?.description : ""}
                  ></textarea>
                </Grid>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={2} size={12}>
                <input
                  type="submit"
                  className={styles.btn}
                  value={isUpdate ? "Update" : "Create"}
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
}
