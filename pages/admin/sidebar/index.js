import React from "react";
import Image from "next/image";

import styles from "@/styles/sidebar.module.css";
import logo_outlined from "../../../public/icons/logo_outlined.svg";
import sidebar_logo_closed from "../../../public/icons/sidebar_logo_closed.svg";

import sidebar_top_gradient from "../../../public/sidebar_top_gradient.svg";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

import { sidebarItems } from "@/mock/navData";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import Search from "@/components/search";
import { AvatarIcon } from "@/public/sidebaricons/AvatarIcon";
import { DownArowSmallIcon } from "@/public/sidebaricons/DownArowSmallIcon";
import { SettingIcon } from "@/public/sidebaricons/SettingIcon";
import { BellIcon } from "@/public/sidebaricons/BellIcon";
import { DownArrowIcon } from "@/public/sidebaricons/DownArrowIcon";
import Link from "next/link";
import { SearchIcon } from "@/public/sidebaricons/SearchIcon";

export default function Sidebaradmin({children}) {
  const [sidebaritems, setSidebaritems] = React.useState(sidebarItems);
  const [selected, SetSelected] = React.useState(false);
  const [subrowopen, setSubrowopen] = React.useState(false);
  const handleSubrow = () => {
    setSubrowopen(!subrowopen);
  };

  const [sidebaropen, setSidebaropen] = React.useState(false);
  const handleSidebar = () => {
    setSidebaropen(!sidebaropen);
  };

  const handleItemClick = (index) => {
    index += 1;
    console.log("in click", index);
    let check = false;
    let temp = sidebaritems;
    temp.forEach((item) => {
      if (item.id == index) item.expanded = !item.expanded;
    });
    setSidebaritems([...temp]);
  };

  const IconCompo = ({ icon: Icon }) => {
    return <Icon />;
  };

  return (
    <div className="flex bg-[#F4F4F4] overflow-x-hidden overflow-y-hidden  ">
      <div
        className={` fixed  ${sidebaropen ? "w-[300px]" : "w-[80px]"}  duration-300 ${
          sidebaropen && "rounded-r-[25px]"
        }  bg-[#FFFFFF] h-screen   `}
      >
        <div
          id={styles.top_gradient}
          className={`h-[77.05px] ${
            sidebaropen && "rounded-tr-[25px]"
          }  cursor-pointer `}
        >
          <div className={`relative`}>
            {/* <Image
              className="absolute   "
              width={sidebaropen ? 300 : 80}
              height={60.92}
              alt="Urban Fits"
              src={sidebar_top_gradient}
            /> */}
            {/* <div style={{backgroundColor:'red'}}
            className={` absolute ${sidebaropen? "w-[300px]": "w-[80px]"} `} >

            </div> */}

            <div
              className={`absolute  flex  items-center ${
                sidebaropen ? "pl-[40px]" : "pl-[20px]"
              }  pt-[20px] `}
              onClick={handleSidebar}
            >
              <Image
                width={37.05}
                height={37.05}
                alt="Urban Fits"
                src={sidebaropen ? logo_outlined : sidebar_logo_closed}
              />
              <p
                className={`text-white ${
                  !sidebaropen && "hidden"
                }    size text-[22px] ml-[12px]`}
              >
                URBAN FITS
              </p>
            </div>
          </div>
        </div>
        {/* <div className="text-green" onClick={handleSidebar}>
          click me
        </div> */}

        {/* <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          <TreeItem nodeId="1" label="Applications">
            <TreeItem nodeId="2" label="Calendar" />
          </TreeItem>
          <TreeItem nodeId="5" label="Documents">
            <TreeItem nodeId="10" label="OSS" />
            <TreeItem nodeId="6" label="MUI">
              <TreeItem nodeId="8" label="index.js" />
            </TreeItem>
          </TreeItem>
        </TreeView> */}

        <div className={` ${sidebaropen ? "px-[30px]" : "px-[29.94px]"}   `}>
          {sidebaritems?.map((item, index) => (
            <div>
              <div className="flex   mt-[37.54px] justify-between  items-center ">
                <Link href={item.navlink}>
                  <div className="flex gap-[10px] ">
                    <div>{item.icon}</div>

                    <p
                      className={`text-[12px] font-[500] font-[Futura LT Pro] 
                ${sidebaropen ? "visible" : "hidden"}
                `}
                    >
                      {item.label}
                    </p>
                  </div>
                </Link>
                <div
                  className={` cursor-pointer ${
                    item.subrows ? "visible" : "hidden"
                  } ${sidebaropen ? "visible" : "hidden"}`}
                  onClick={() => handleItemClick(index)}
                >
                  {!item.expanded ? <RightArrowIcon /> : <DownArrowIcon />}
                </div>
              </div>

              {item.subrows?.map((subitem, index) => (
                <div
                  className={`flex gap-[10px] mt-[28px]  ${
                    item.expanded ? "visible" : "hidden"
                  }  `}
                >
                  <Link href={subitem.navlink}>
                    <p
                      className={` cursor-pointer text-[12px] font-[500] font-[Futura LT Pro] 
                  ${sidebaropen ? "visible" : "hidden"}
                  `}
                    >
                      {subitem.label}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* /////////66666666666666666666666666666666666//////////// */}

      <div className={`px-[30px] py-[44px] bg-[#F4F4F4]  w-[1560px]  overflow-y-scroll
        ${sidebaropen? "ml-[300px]": "ml-[80px]" }  duration-300
       `}  >
        {/* /////////////////////////////////////////////////// */}
        <div className={` flex justify-between  items-center `}>
          <div className={`flex items-center `}>
            <label className="switch2 w-[40px] h-[22.25px]  ">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <div id="searchdiv" className={` ml-[29.53px] `}>
              <div className="flex flex-row items-center gap-[10] w-[15.95px] h-[16px]"></div>
              {/* <i className="material-symbols-outlined absolute">search</i> */}
              <span className="absolute" >
                <SearchIcon />
              </span>

              <input
                type="text"
                id="search"
                onChange={onchange}
              className="w-[139px] h-[17px] flex items-center text-[14px] font-[400] font_futuralt bg-transparent outline-none  "
                placeholder="Search (Keyword, etc)"
              />
            </div>
          </div>

          <div className={` flex items-center  `}>
            <span>
              <AvatarIcon />
            </span>
            <span className={` ml-[15px] `}>
              <DownArowSmallIcon />
            </span>
            <span className={` ml-[20px] `}>
              <BellIcon />
            </span>
            <span>
              <SettingIcon />
            </span>
          </div>
        </div>
        <hr className={`mt-[20px]`} />
        {/* ////////////////////////////Children START //////////////////////////////////////////////////////// */}

                {children}

        {/* ///////////////////////////////Children END///////////////////////////////////////////////////// */}
      </div>
      {/*  */}
    </div>
  );
}
