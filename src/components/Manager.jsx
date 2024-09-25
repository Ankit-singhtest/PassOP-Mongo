import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/", { method: "GET" });

    let password = await req.json();
    console.log(password);
    setPasswordArray(password);
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eye.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = async () => {
    //  if any such id exists in the db,delete it
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });

    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });
    // localStorage.setItem("passwords", JSON.stringify(newPasswordsArray));
    // console.log([...passwordArray, form]); // Corrected typo
    setForm({ site: "", username: "", password: "" });
    toast("Password saved successfully!", {
      position: "bottom-right",
      autoClose: 2000, // Automatically closes after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const deletePassword = async (id) => {
    console.log("Deleting password with id", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      toast("Password deleted successfully!", {
        position: "bottom-right",
        autoClose: 2000, // Automatically closes after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    // Implementation for editing password
    console.log("Editing password with id", id);
    setForm({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    toast("Password edited successfully!", {
      position: "bottom-right",
      autoClose: 2000, // Automatically closes after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
  position="bottom-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:p-0 md:mycontainer min-h-[84.5vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">OP/ &gt;</span>
        </h1>
        <p className="text-lg text-center text-green-900">
          Your own password manager
        </p>
        <div className="flex flex-col items-center gap-8 p-4 text-black">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website Url"
            className="w-full p-4 py-1 border border-green-400 rounded-full"
            type="text"
            name="site"
          />
          <div className="flex flex-col justify-between w-full gap-8 md:flex-row">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="w-full p-4 py-1 border border-green-400 rounded-full"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full p-4 py-1 border border-green-400 rounded-full"
                type="password"
                name="password"
              />
              <span
                className="absolute right-[5px] top-[0px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="w-8 p-1"
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center justify-center gap-2 px-8 py-2 bg-green-600 border-2 border-green-700 rounded-full hover:bg-green-500 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="py-4 text-2xl font-bold">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No password to show</div>}
          {passwordArray.length !== 0 && (
            <table className="w-full mb-10 overflow-hidden rounded-md table-auto ">
              <thead className="text-white bg-green-800 ">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 ">
                {passwordArray.map((item) => (
                  <tr key={item.id}>
                    <td className="justify-center py-2 text-center border border-white ">
                      <div className="flex items-center justify-center ">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.site}
                        </a>
                        <div
                          className="cursor-pointer size-7"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="justify-center py-2 text-center border border-white ">
                      <div className="flex items-center justify-center ">
                        <span>{item.username}</span>
                        <div
                          className="cursor-pointer size-7"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center border border-white ">
                      <div className="flex items-center justify-center ">
                        <span>{"*".repeat(item.password.length)}</span>
                        <div
                          className="cursor-pointer size-7"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="justify-center py-2 text-center border border-white ">
                      <span
                        className="mx-1 cursor-pointer"
                        onClick={() => editPassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/wuvorxbv.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>

                      <span
                        className="mx-1 cursor-pointer"
                        onClick={() => deletePassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
