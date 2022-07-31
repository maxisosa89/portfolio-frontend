import React from "react";
import { NavLink } from "react-router-dom";

export default function SkillsPage() {
  return (
    <div className="flex justify-center h-screen container mx-auto bg-tertiary py-24">
      <div className="border bg-secondary m-auto text-white mx-auto md:mx-6 lg:mx-12 p-2 md:p-6 lg:p-12">
        <div className="m-1 sm:m-5">
          <h1 className="text-5xl">Habilidades</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae rerum asperiores voluptas dolorem excepturi blanditiis suscipit amet voluptatibus repellendus iste!
          </p>
        </div>
        <div className="m-1 sm:m-5 flex flex-wrap text-center">
          <div className=" w-full sm:w-1/2">
            <h3>Hard skills:</h3>
            <ul>
                <li>Tech</li>
                <li>Tech</li>
                <li>Tech</li>
                <li>Tech</li>
                <li>Tech</li>
                <li>Tech</li>
            </ul>
          </div>
          <div className=" w-full sm:w-1/2">
            <h3>Soft skills:</h3>
            <ul>
                <li>Skill</li>
                <li>Skill</li>
                <li>Skill</li>
                <li>Skill</li>
                <li>Skill</li>
                <li>Skill</li>
            </ul>
          </div>
        </div>
        <div className="m-1 sm:m-5">
            <h3>Sub Habilidades:</h3>
            <ul>
                <li>Skill: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti itaque commodi soluta possimus nostrum harum fuga laudantium porro unde numquam!</li>
                <li>Skill: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti itaque commodi soluta possimus nostrum harum fuga laudantium porro unde numquam!</li>
                <li>Skill: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti itaque commodi soluta possimus nostrum harum fuga laudantium porro unde numquam!</li>
                <li>Skill: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti itaque commodi soluta possimus nostrum harum fuga laudantium porro unde numquam!</li>
                <li>Skill: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti itaque commodi soluta possimus nostrum harum fuga laudantium porro unde numquam!</li>
                <li>Skill: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti itaque commodi soluta possimus nostrum harum fuga laudantium porro unde numquam!</li>
            </ul>
        </div>
        <div className="m-0 sm:m-5 flex flex-wrap justify-center text-center">
          <div className="flex flex-wrap justify-center w-full sm:w-1/2">
            <embed
              src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656843099/Portfolio/CV/tcanpxggjxahqvlxi2n3.pdf#toolbar=0"
              type="application/pdf"
              width="210px"
              height="297px"
            />
            <div className="w-[210px] bg-tertiary">
              <span>HOLA</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center w-full sm:w-1/2">
            <embed
              src="https://res.cloudinary.com/dg7fmdsmw/image/upload/v1659168356/Portfolio/CV/Diploma_Henry_kiejpc.pdf#toolbar=0"
              type="application/pdf"
              width="279px"
              height="216px"
            />
            <div className="w-[279px] bg-tertiary">
              <span>HOLA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}