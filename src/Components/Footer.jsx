import { Link } from "react-router-dom";

import { FaRegEnvelope } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-[#043d43] text-white px-10  py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-12 mb-12 text-center md:text-left">
          <div className="flex-1 min-w-[220px]   lg:mr-20 flex flex-col gap-4 items-center md:items-start">
            <img
              src="/brain-logo-icon-human-brain-icon-creative-simple-mind-symbol-vector-illustration_118339-6640.avif"
              alt="mindease Logo"
              className=" w-16 h-20 rounded-full sm:w-20 sm:h-16 object-contain"
            />
            <h3 className="font-semibold text-lg">
              MindEase , Mental Health Platform
            </h3>
            <p className="text-sm leading-relaxed opacity-80 max-w-xl">
              MindEase is a secure and transparent Mental Health platform
              for those who can't affords treatments and advices from doctors 
              connecting donors with medical, social, and educational causes. We
              ensure accountability and safe fund transfers, fostering
              community-driven support to create meaningful change.
            </p>
          </div>

          {/* {FooterData?.map((section, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[220px] mt-10  text-center md:text-left"
            >
              <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.list.map((listItem, i) => (
                  <li key={i}>
                    <Link
                      to={listItem.link}
                      className="text-sm hover:underline hover:text-gray-200 transition-all duration-200"
                    >
                      {listItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))} */}

          <div className="flex-1 min-w-[220px] mt-7 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mt-2 mb-7">
              <h4 className="font-semibold text-lg mb-2">Contact</h4>
           
              <div className="flex justify-center md:justify-start items-center  mb-2">
                <a
                  href="tel:+918273588666"
                  className="text-sm flex gap-2 items-center"
                >
                  <IoMdCall className="w-4 h-4" />
                  +91 82735xxxxx
                </a>
              </div>
              <div className="flex justify-center md:justify-start items-center ">
                <a
                  href="mailto:admin@aidcircle.in"
                  className="text-sm gap-2 flex items-center"
                >
                  <FaRegEnvelope className="w-4 h-4 " />
                  ronakvarshney7100@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/aid_circle/?igsh=aTNiNml3cXQ5emF6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              ></a>
              <a
                href="https://www.linkedin.com/company/aid-circle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              ></a>
              <a
                href="https://www.facebook.com/people/Aid-Circle/61569936987930/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              ></a>
            </div>

            <h5 className="mt-6 font-semibold text-sm">We Accept</h5>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-2"></div>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 pt-6">
          <p className="text-center text-xs opacity-80">
            © {new Date().getFullYear()} MindEase. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
