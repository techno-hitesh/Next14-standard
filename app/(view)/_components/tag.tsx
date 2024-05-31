// import React, { useEffect, useState } from "react";
// import './tag.css';

// const Tag = () => {
//   const [tag, setTag] = useState<any>("");
//   const [show, setShow] = useState(false);
//   const [tags, setTags] = useState<any>([]);
//   const [alltags, setAlltags] = useState<any>([]);
//   const [selected, setselected] = useState(false);
//   const [icon, setIcon] = useState(false);

//   const checkInput = () => {
//     // console.log("tag",tags)
//     const tag:any=localStorage.getItem("tags") || undefined;
//     if (tag === "") {
//       setselected(false);
//       setIcon(false);
//       const storedTags = JSON.parse(tag) 
//       setTags(storedTags);
//     } else {
//       setIcon(true);
//       const storedTags = JSON.parse(tag)
//       setAlltags(storedTags);
//       // const matchedTags = storedTags.filter((t: string | any[]) => t === tag);
//       // setTags(matchedTags)
//       // if(matchedTags?.length){
//       //     setIcon(false)
//       // }
//       setTags(storedTags.filter((t: string | any[]) => t.includes(tag)));
//       setShow(true);
//     }
//   };

//   const handleTags = () => {
//     if (!alltags.includes(tag) && tag !== "") {
//       setIcon(true);
//       const updatedTags = [...alltags, tag];
//       localStorage.setItem("tags", JSON.stringify(updatedTags));
//       setShow(false);
//     } else {
//       setShow(false);
//       setTag(tag);
//       setIcon(false);
//     }
//   };

//   const selectedTag = (value: any) => {
//     setselected(true);
//     setShow(false);
//     setTag(value);
//   };
//   useEffect(() => {
//     checkInput();
//   }, [tag]);

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           onBlur={checkInput}
//           placeholder="Enter tag"
//           className="px-2  py-2 outline-none"
//           value={tag}
//           onChange={(e) => setTag(e.target.value)}
//         />
//       </div>
//       {show && !selected && (
//         <div className="bg-black p-4 w-[50%] rounded-md h-full">
//           <div className="flex items-center justify-between text-lg">
//             <div className="flex justify-center items-center my-2 gap-x-4">
//               <span className="text-gray-400">Create</span>
//               {tag !== "" && !selected ? (
//             <span className="price-tag">{tag}clear</span>
//               ) : (
//                 "Enter tag"
//               )}
//             </div>
//             <div>
//               {icon && (
//                 <span
//                   onClick={handleTags}
//                   className="inline-flex cursor-pointer items-center justify-center px-2 py-1 mr-2 text-md font-bold leading-none bg-pink-100 text-pink-900 rounded-full"
//                 >
//                   +
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {tags.map(
//               (storedTag: string, index: React.Key | null | undefined) => (
//                 <span
//                   key={index}
//                   onClick={() => {
//                     selectedTag(storedTag);
//                   }}
//                   className="price-tag1"
//                 >
//                   {storedTag}
//                 </span>
//               )
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tag;
