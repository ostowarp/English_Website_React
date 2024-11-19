// import servicess:
import { getCategories, addCategory, createDeck } from "../../servicess";

import { useEffect, useRef, useState } from "react";
import styles from "../../Style/decks/AddDeck.module.css";

// import icons:
import closeicon from "../../assets/icons/close.svg";
import addicon from "../../assets/icons/add.svg";

// import components:
import { CustomCheckBox } from "../";
import Grid from "@mui/material/Grid2";
import FlagIcon from "react-world-flags";

// import golobal state:
import useTokenStore from "../../store/useTokenstate";
import { useNavigate } from "react-router-dom";

export default function AddDeck({ handleclose }) {
  const { token } = useTokenStore();
  const [addInput, setAddInput] = useState(false);
  const inputRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const languages = [
    { label: "Afrikaans", flag: "ZA" },
    { label: "Arabic", flag: "SA" },
    { label: "Persian", flag: "IR" },
    { label: "English", flag: "GB" },
    { label: "French", flag: "FR" },
    { label: "Spanish", flag: "ES" },
    { label: "German", flag: "DE" },
    { label: "Russian", flag: "RU" },
    { label: "Chinese", flag: "CN" },
    { label: "Japanese", flag: "JP" },
  ];

  //   Note loade categories:
  const loadCategories = async () => {
    try {
      const { data: categoriesdata } = await getCategories(token);
      setCategories(categoriesdata);
      console.log("ljaljlfja;ljf;lja;ljf;jads;ljfl;asjd;lfj;asdjf");

      console.log(categoriesdata);
    } catch (error) {
      console.log("EEEEEEEEROOOOOOOOORRRRRRRR");
    }
  };

  //   NOTE add new category
  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return; // بررسی مقدار خالی

    try {
      const { data: addedCategory } = await addCategory(token, newCategory);
      setNewCategory(""); // پاک کردن اینپوت
      setAdded(!added);
      setAddInput(false); // بستن اینپوت
    } catch (error) {
      console.log("Error adding category", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    loadCategories();
  }, [added]);

  const handleCheckboxChange = (label) => {
    setSelectedOptions((prev) =>
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
    setAddInput(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // NOTE create deck:
  const handleCreateDeck = (e) => {
    e.preventDefault(); // جلوگیری از رفتار پیش‌فرض فرم

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // default value for name and description:
    data.name = data.name === "" ? "New Deck" : data.name;
    data.description = data.description === "" ? "..." : data.description;

    // add categories:
    data.category_ids = categories
      .filter((cat) => selectedOptions.includes(cat.name))
      .map((cat) => cat.id);

    e.preventDefault(); // جلوگیری از رفتار فرم
    const createNewDeck = async () => {
      try {
        const { data: deckData } = await createDeck(token, data);
        navigate(`/decks/${deckData.id}`);
        handleclose();
      } catch (error) {
        console.log(error.message);
      }
    };
    createNewDeck();
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
                    New Deck
                  </h3>
                  <img
                    onClick={() => handleclose()}
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
                  />
                </Grid>
                <Grid
                  style={{ position: "relative", height: "4.8rem" }}
                  size={12}
                >
                  <select name="language" className={styles.select}>
                    {languages.map((lang) => (
                      <option
                        key={lang.label}
                        className={styles.option}
                        value={lang.label}
                      >
                        <p>{lang.label}</p>
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
                      checked={selectedOptions.includes(category.name)}
                      onChange={() => handleCheckboxChange(category.name)}
                    />
                  ))}
                  {addInput ? (
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
                        onClick={() => handleAddCategory()}
                        className={styles.add}
                      >
                        Add
                      </p>
                    </>
                  ) : (
                    <span
                      onClick={() => handleAddInput()}
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
                  ></textarea>
                </Grid>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={2} size={12}>
                <input type="submit" className={styles.btn} value={"Create"} />
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
}
