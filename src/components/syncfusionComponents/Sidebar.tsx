import React from "react";

import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { GiLouvrePyramid } from "react-icons/gi";
import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import {
  FiShoppingBag,
  FiEdit,
  FiPieChart,
  FiBarChart,
  FiCreditCard,
  FiStar,
  FiShoppingCart,
} from "react-icons/fi";
import {
  BsKanban,
  BsBarChart,
  BsBoxSeam,
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
} from "react-icons/bs";

import { useStateContext } from "../../contexts/ContextProvider";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const { activeMenu, setActiveMenu } = useStateContext();

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 text-black";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-slate-700 dark:text-slate-500 dark:hover:text-black hover:bg-light-gray m-2 text-slate-700";

  return (
    <div
      className={`${
        activeMenu ? "w-64" : "w-0"
      } h-screen min-w-max md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-slate-50`}
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link href="/">
              <a className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight  text-slate-900">
                {" "}
                <SiShopware /> <span>ADMIN</span>
              </a>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                // style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel className="text-slate-900" />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title} className="">
                <p className="text-slate-600 dark:text-slate-600 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <Link href={`/admin/${link.name}`} key={link.name}>
                    <a
                      className={
                        router.pathname == `/admin/${link.name}`
                          ? activeLink
                          : normalLink
                      }
                    >
                      {link.icon}
                      <span className="capitalize ">{link.name}</span>
                    </a>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "order",
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: "employees",
        icon: <IoMdContacts />,
      },
      {
        name: "customers",
        icon: <RiContactsLine />,
      },
    ],
  },
  {
    title: "Apps",
    links: [
      {
        name: "calendar",
        icon: <AiOutlineCalendar />,
      },
      {
        name: "kanban",
        icon: <BsKanban />,
      },
      {
        name: "editor",
        icon: <FiEdit />,
      },
      {
        name: "color-picker",
        icon: <BiColorFill />,
      },
    ],
  },
  {
    title: "Charts",
    links: [
      {
        name: "line",
        icon: <AiOutlineStock />,
      },
      {
        name: "area",
        icon: <AiOutlineAreaChart />,
      },

      {
        name: "bar",
        icon: <AiOutlineBarChart />,
      },
      {
        name: "pie",
        icon: <FiPieChart />,
      },
      {
        name: "financial",
        icon: <RiStockLine />,
      },
      {
        name: "color-mapping",
        icon: <BsBarChart />,
      },
      {
        name: "pyramid",
        icon: <GiLouvrePyramid />,
      },
      {
        name: "stacked",
        icon: <AiOutlineBarChart />,
      },
    ],
  },
];
