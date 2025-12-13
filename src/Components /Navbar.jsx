import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <header className="navbar bg-white p-5 shadow-md">
      <nav className="menu">
        <ul className="flex gap-5">

          <li>
            <a
              href="/home"
              className="text-[#079992] bg-[#e0f7f7] px-4 py-2 rounded-md font-bold hover:bg-[#38ada9] hover:text-white transition"
            >
              Home
            </a>
          </li>

          <DropdownMenu
            title="Profile"
            items={["View Profile", "Edit Profile", "Upload Images"]}
            open={openMenu === "profile"}
            onClick={() => toggleMenu("profile")}
          />

          <DropdownMenu
            title="Workouts"
            items={["Browse Workouts", "My Saved Workouts", "Trending"]}
            open={openMenu === "workouts"}
            onClick={() => toggleMenu("workouts")}
          />

          <DropdownMenu
            title="Gyms & Studios"
            items={["Local Gyms", "Studios", "Online Facilities"]}
            open={openMenu === "gyms"}
            onClick={() => toggleMenu("gyms")}
          />

          <DropdownMenu
            title="Trainers"
            items={["Find Trainers", "Top Rated", "Specialties"]}
            open={openMenu === "trainers"}
            onClick={() => toggleMenu("trainers")}
          />

          <li>
            <a
              href="#"
              className="text-[#079992] bg-[#e0f7f7] px-4 py-2 rounded-md font-bold hover:bg-[#38ada9] hover:text-white transition"
            >
              Logout
            </a>
          </li>

        </ul>
      </nav>
    </header>
  );
