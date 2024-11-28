import { getServerUrl } from "../../servicess";

import React, { useState } from "react";
// ........ import CKEditor ........
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// ........ import Styles ........
import styles from "../../Style/editor/TextEditor.module.css";
import "./customclass.css";
import { useParams } from "react-router-dom";

const TextEditor = ({ handleEditorChange, data, view }) => {
  const deckId = useParams();
  const url = getServerUrl();

  return (
    <div
      className={styles.editor}
      style={{ width: "100%", overflowX: "hidden" }}
    >
      <CKEditor
        editor={ClassicEditor}
        className={styles.customEditor}
        data={view ? data : ""}
        config={{
          placeholder: "wirte here....",

          alignment: {
            options: [
              { name: "left", className: "my-align-left" },
              { name: "right", className: "my-align-right" },
            ],
          },
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "bold",
              "italic",
              "|",
              "link",
              "uploadImage",
              "blockQuote",
              "codeBlock",
              "|",
              "bulletedList",
              "numberedList",
              "outdent",
              "indent",
              "|",
              "insertTable", // دکمه ایجاد جدول
            ],
            image: {
              toolbar: ["imageTextAlternative", "linkImage"], // فقط کپشن و لینک
              styles: {
                options: [
                  "block", // تصویر به‌صورت بلوک
                  "inline", // تصویر درون‌خطی
                ], // حذف سایر گزینه‌ها
              },
            },
            removePlugins: ["ImageStyle:side"], // حذف استایل Side Image

            shouldNotGroupWhenFull: true, // جلوگیری از گروه‌بندی ابزارها
          },
          ckfinder: {
            uploadUrl: `${url}/api/decks/images/${deckId.id}/`,
            options: {
              resourceType: "Images", // نوع فایل (اختیاری)
            },

            // headers: {
            //   Authorization: `Bearer ${token}`, // ارسال توکن در هدر
            // },
          },
        }}
        onChange={handleEditorChange}
      />

      {/* <div style={{ marginTop: "20px" }}>
        <h3>Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div> */}
    </div>
  );
};

export default TextEditor;
