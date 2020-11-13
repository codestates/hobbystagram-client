import React, { useState } from 'react'


const width = 300;
const height = 300;
const borderStyle = "2px dotted #000";

const dropAreaImageStyle = {
  width,
  height
};

const dropAreaStyle = {
  ...dropAreaImageStyle,
  border: borderStyle
};
const tags = [
  {
    label: 'tag',
    value: 'default'
},
{
    label: 'Trip',
    value: 'tr'
},
{
    label: 'Seoul',
    value: 'se'
},
{
    label: 'Poppy',
    value: 'po'
},
{
    label: 'Kitten',
    value: 'ki'
}
]
function SideBar() {
  // image drag & drop 의 state
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);
  
  // toggle button 안에 들어갈 내용들(options)
  const [tag, setTag] = useState(tags[0])


  // drag & drop 을 구현하기 위한 함수
  const onDrop = e => {
    e.preventDefault();
    const {
      dataTransfer: { files }
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
    reader.onload = loadEvt => {
      setData(loadEvt.target.result);
    };
  };
  const onDragStart = e => {
    e.preventDefault();
  };
  const onDragOver = e => {
    e.preventDefault();
  };
  
  

  return (
    <div>
      {/* drag & drop 구역 */}
      <div>
      {err && <p>{err}</p>}
      <div
        style={dropAreaStyle}
        onDrop={e => onDrop(e)}
        onDragOver={e => onDragOver(e)}
      >
        {data && <img style={dropAreaImageStyle} src={data} />}
        +업로드할 사진을 drag & drop 으로 올려 주세요
      </div>
      <div className="button-wrapper">
        {data && <button onClick={() => setData(false)}>Remove</button>}
      </div>
    </div>

    {/* 토글 버튼 구역 */}
    <form>
      <label>choose your tag</label>
      <select>
        {tags.map(tag => (
          <option key={tag.value} value={tag.label} onChange={setTag}>
            {tag.label}
          </option>
        ))}
      </select>
    </form>

    </div>
  );
};

export default SideBar;
