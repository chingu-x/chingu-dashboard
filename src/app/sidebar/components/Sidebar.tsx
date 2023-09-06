import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <div className="menu p-4 w-24 min-h-screen h-20 bg-base-200">
          <label htmlFor="my-drawer" className="btn btn-white drawer-button">
            <ArrowRightOnRectangleIcon className="text-black h-6 w-6" />
          </label>
        </div>
      </div>
      <div className="drawer-side">
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            <ArrowLeftOnRectangleIcon className="text-black h-6 w-6" />
          </label>
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>

      </div>
    </div>
  );
}
