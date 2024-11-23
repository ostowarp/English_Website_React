import { getServerUrl } from "../../servicess";

import React, { useState } from "react";
// ........ import CKEditor ........
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// ........ import Styles ........
import styles from "../../Style/editor/EditorOutput.module.css";

import { useParams } from "react-router-dom";

const EditorOutput = ({ content }) => {
  const deckId = useParams();
  const url = getServerUrl();

  return (
    <div
      className={styles.editor}
      style={{ width: "100%", overflowX: "hidden" }}
    >
      <div style={{ marginTop: "20px" }}>
        <h3>Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default EditorOutput;
