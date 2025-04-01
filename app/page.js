"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, MessageCircle, Phone, X } from "lucide-react";
import axios from "axios";
import { baseURL } from "./urls";
import VapiAssistant from "./components/VapiAssistant";
import ClientAssistant from "./components/ClientAssistant";

const FloatingBlob = ({ className }) => (
  <svg
    viewBox="0 0 200 200"
    className={`absolute ${className}`}
    style={{ filter: "blur(30px)" }}
  >
    <path
      fill="rgba(59, 130, 246, 0.25)"
      d="M41.2,-70.7C54.8,-64.6,68,-55.5,76.3,-42.7C84.6,-30,88,-13.5,86.6,2.3C85.2,18,79,33,69.7,45.3C60.4,57.6,48,67.2,34.1,73.7C20.2,80.2,4.8,83.6,-10.2,81.8C-25.2,80,-39.8,73,-52.1,63.1C-64.4,53.2,-74.4,40.4,-79.7,25.8C-85,11.2,-85.6,-5.2,-81.7,-20.1C-77.8,-35,-69.4,-48.4,-57.4,-55.4C-45.4,-62.5,-29.9,-63.2,-15.9,-64.7C-1.9,-66.2,10.5,-68.5,22.9,-69.8C35.3,-71.1,47.7,-71.4,41.2,-70.7Z"
      transform="translate(100 100)"
    />
  </svg>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur-sm opacity-25 transition-all duration-300 group-hover:opacity-40"></div>
    <div className="relative flex flex-col h-full p-4 md:p-6 lg:p-8 transition-all duration-300 bg-white border border-blue-100 rounded-xl hover:shadow-xl hover:scale-105">
      <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
      </div>
      <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-gray-900">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-600">{description}</p>
    </div>
  </div>
);

// const PhoneVerification = ({ onClose }) => {
//   const [phone, setPhone] = useState("");
//   const [isVerified, setIsVerified] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     setError("");

//     try {
//       await axios.post(
//         `${baseURL}/api/plan/make-call`,
//         {
//           callTo: phone,
//           assistantId: "606ca662-64d6-4e5c-9b53-b0f9d508ac83",
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setIsVerified(true);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Something went wrong. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePhoneChange = (e) => {
//     setPhone(e.target.value);
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen p-4">
//         <div
//           className="fixed inset-0 bg-black/50 transition-opacity"
//           onClick={onClose}
//         />

//         <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all">
//           <button
//             onClick={onClose}
//             className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>

//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">
//               Provide Your Phone
//             </h2>
//             <p className="mt-2 text-sm text-gray-500">We'll get back to you</p>
//           </div>

//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
//               {error}
//             </div>
//           )}

//           {!isVerified ? (
//             <div className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Phone Number
//                 </label>
//                 <input
//                   id="phone"
//                   type="tel"
//                   placeholder="Enter Phone No"
//                   value={phone}
//                   onChange={handlePhoneChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   disabled={isLoading}
//                 />
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                       ></path>
//                     </svg>
//                     Processing...
//                   </span>
//                 ) : (
//                   "Call Me"
//                 )}
//               </button>
//             </div>
//           ) : (
//             <div className="text-center space-y-4">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
//                 <svg
//                   className="w-8 h-8 text-green-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <p className="text-gray-600">We'll call you shortly!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

const PhoneVerification = ({ onClose }) => {
  const [phone, setPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://api.npoint.io/900fa8cc45c942a0c38e"
        );
        setCountries(response.data);
        // Set default country
        if (response.data.length > 0) {
          setSelectedCountry(response.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const fullPhone = `+${selectedCountry?.code}${phone}`;
      await axios.post(
        `${baseURL}/api/plan/make-call`,
        {
          callTo: fullPhone,
          assistantId: "606ca662-64d6-4e5c-9b53-b0f9d508ac83",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsVerified(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Provide Your Phone
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;ll get back to you
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {!isVerified ? (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="flex">
                    <div className="relative">
                      <button
                        type="button"
                        className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span className="mr-2 text-black">
                          +{selectedCountry?.code}
                        </span>
                        <span className="text-black">▼</span>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                          <div className="p-2">
                            <input
                              type="text"
                              placeholder="Search countries..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {filteredCountries.map((country) => (
                              <button
                                key={country.iso}
                                className="text-black w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 transition-colors"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsDropdownOpen(false);
                                }}
                              >
                                <span className="mr-2">{country.country}</span>
                                <span className="text-black">
                                  +{country.code}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter Phone No"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading || !selectedCountry}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Call Me"
                )}
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-gray-600">We&apos;ll call you shortly!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [showAssistant, setShowAssistant] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVapiCall, setIsVapiCall] = useState(false);

  useEffect(() => {
    const storedAuthToken = localStorage.getItem("authToken");
    setAuthToken(storedAuthToken);
  }, []);

  const features = [
    {
      icon: Calendar,
      title: "24/7 Scheduling",
      description:
        "Book your appointments anytime, anywhere with our intelligent booking system",
    },
    {
      icon: Clock,
      title: "Instant Confirmation",
      description:
        "Receive immediate confirmations and automated appointment reminders",
    },
    {
      icon: MessageCircle,
      title: "Smart Assistant",
      description:
        "AI-powered scheduling that learns your preferences for the perfect time slot",
    },
    {
      icon: Phone,
      title: "Priority Care",
      description:
        "Immediate assistance for emergencies with priority scheduling",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="hidden md:block">
        <FloatingBlob className="top-0 left-0 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] animate-pulse" />
        <FloatingBlob className="bottom-0 right-0 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] animate-pulse delay-1000" />
        <FloatingBlob className="top-1/2 right-1/4 w-[300px] md:w-[400px] lg:w-[600px] h-[300px] md:h-[400px] lg:h-[600px] animate-pulse delay-500" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12 md:mb-20">
            <h1 className="mb-4 md:mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Practice<span className="text-blue-600">Agent</span>
            </h1>
            <p className="mb-6 md:mb-10 text-lg md:text-xl text-gray-600">
              Experience the future of appointment scheduling
            </p>
            <div className="flex justify-center gap-2 items-center">
              {/* <button
                onClick={() => setShowAssistant(true)}
                className="px-6 md:px-10 py-2 md:py-4 text-base md:text-lg font-semibold text-white transition-all bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:shadow-lg hover:scale-105"
              >
                Try Now
              </button> */}

              <button
                onClick={() => setIsVapiCall(true)}
                className="px-6 md:px-10 py-2 md:py-4 text-base md:text-lg font-semibold text-white transition-all bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:shadow-lg hover:scale-105"
              >
                Try Inbound call
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
        {/* <div className="flex justify-center mt-10">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 md:px-10 py-2 md:py-4 text-base md:text-lg font-semibold text-white transition-all bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:shadow-lg hover:scale-105"
          >
            Schedule a Call
          </button>{" "}
        </div> */}
      </div>

      {showAssistant && (
        <ClientAssistant
          id={"Dentist--J4688teFHbm8CN2OXpAP_"}
          authToken={authToken}
        />
      )}
      {isVapiCall && <VapiAssistant setIsVapiCall={setIsVapiCall} />}
      {isOpen && <PhoneVerification onClose={() => setIsOpen(false)} />}
    </div>
  );
}
