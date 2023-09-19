import React from "react";

function TestSidebar() {
  return (
    <aside className="sticky top-16 h-[calc(100vh-theme(spacing.16))] w-40 overflow-y-auto bg-green-200">
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>
    </aside>
  );
}

export default TestSidebar;
