import React, { useState } from "react";
import axios from "axios";
// import "./SideBar.css";

const width = 300;
const height = 300;
const borderStyle = "2px dotted #000";

const tags = [
  {
    label: "tag",
    value: "default",
  },
  {
    label: "Trip",
    value: "tr",
  },
  {
    label: "Seoul",
    value: "se",
  },
  {
    label: "Poppy",
    value: "po",
  },
  {
    label: "Kitten",
    value: "ki",
  },
];
function SideBar({ getPhotos }) {
  // image drag & drop 의 state

  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);

  // toggle button 안에 들어갈 내용들(options)
  const [tag, setTag] = useState(tags[0]);

  // drag & drop 을 구현하기 위한 함수
  const dropAreaImageStyle = {
    width,
    height,
  };

  const dropAreaStyle = {
    ...dropAreaImageStyle,
    border: borderStyle,
  };
  const onDrop = (e) => {
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    console.log("Files: ", files);
    const { length } = files;
    const reader = new FileReader();
    if (length === 0) {
      return false;
    }
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const { size, type } = files[0];
    setData(false);
    if (!fileTypes.includes(type)) {
      setErr("File format must be either png or jpg");
      return false;
    }
    if (size / 1024 / 1024 > 2) {
      setErr("File size exceeded the limit of 2MB");
      return false;
    }
    setErr(false);

    reader.readAsDataURL(files[0]);
    reader.onload = (loadEvt) => {
      setData(loadEvt.target.result);
    };
  };
  const onDragStart = (e) => {
    e.preventDefault();
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // {/* 올려놓은 사진과 선택한 태그를 자료로 이미지 업로드하는 함수 */}
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", data);
    formData.append("tag", tag);
    const res = await axios.post("/signup/avatar", formData);
    console.log(res);
  };

  return (
    <div className="sidebar">
      {/* drag & drop 구역 */}
      <div className="image">
        {err && <p>{err}</p>}
        <div onDrop={(e) => onDrop(e)} onDragOver={(e) => onDragOver(e)}>
          {data && <img style={dropAreaImageStyle} src={data} />}
          
        </div>
        {/* <div className="button-wrapper">{ */}
        {/* data &&  */}
        
        {/* }</div> */}
      </div>
      <button className="remove-button" onClick={() => setData(false)}>Remove</button>

      {/* 토글 버튼 구역 */}
      <form className="uploadtag">
        <select>
          {tags.map((tag) => (
            <option key={tag.value} value={tag.label} onChange={setTag}>
              {tag.label}
            </option>
          ))}
        </select>
      </form>

      {/* 올려놓은 사진과 선택한 태그를 자료로 이미지 업로드하기 */}
      <button className="upload-button" onClick={handleImageUpload}>사진 업로드</button>

      {/* UI 때문에 만든 div. 기능은 없다 */}
      <div className="gap"></div>
      {/* 태그를 선택하면 선택된 태그 기준으로 get 요청 보내서 화면에 뿌려주기       */}
      <form className="sorttag">
        <select>
          {tags.map((tag) => (
            <option key={tag.value} value={tag.label} onChange={setTag}>
              {tag.label}
            </option>
          ))}
        </select>
      </form>
      <button className="sort-button" onClick={() => getPhotos()}>모아보기</button>
    </div>
  );
}

export default SideBar;
