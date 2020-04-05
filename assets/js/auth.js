function authReload() {
    front.send("read_file", app.getPath("userData"), "classsix_student_data.ad", content => {
        const loggedIn = document.getElementById("loggedIn");
        const unregButton = document.getElementById("toUnreg");
        const modalWin = document.getElementById("modalWin");
        const authButton = document.getElementById("toAuth");
        const diaryBtn = document.getElementById("toDiary");
        const news = document.getElementById("news");
        const diary = document.getElementById("diary");
        const toMain = document.getElementById("toMain");

        const logged = () => {
            loggedIn.value = "1";
            modalWin.style.display = "none";
            authButton.style.display = "none";
            unregButton.style.display = "block";
            diaryBtn.style.display = "block";
            showRatings();
        }

        const notLogged = () => {
            loggedIn.value = "0";
            modalWin.style.display = "none";
            authButton.style.display = "block";
            unregButton.style.display = "none";
            diaryBtn.style.display = "none";
            news.style.display = "block";
            diary.style.display = "none";
            toMain.style.backgroundColor = "#00A";
            diaryBtn.style.backgroundColor = "blue";
            gapsReload();
        }

        if (content !== "") {
            const data = content.split(/\r?\n/);

            front.send("is_user_exists_md5", data[0], data[1], isExists => {
                if (isExists) logged();
                else notLogged();
            });
        } else notLogged();
    });
}

authReload();

const authButton = document.getElementById("toAuth");
const authorize = document.getElementById("authorize");
const cancelAuth = document.getElementById("cancelAuth");
const modalWin = document.getElementById("modalWin");
const unreg = document.getElementById("toUnreg");

authButton.onclick = () => modalWin.style.display = "flex";

authorize.onclick = () => {
    modalWin.style.display = "none";
    const login = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    front.send("is_user_exists", login, password, isExists => {
        if (isExists) {
            const path = app.getPath("userData");
            const FILE = "classsix_student_data.ad";

            front.send("md5", password, newPassword1 => {
                front.send("md5", newPassword1, newPassword2 => {
                    front.send("write_file", path, FILE, login + "\n" + newPassword2, authReload);
                });
            });
        }
    });
}

unreg.onclick = () => {
    modalWin.style.display = "none";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    const path = app.getPath("userData");
    const FILE = "classsix_student_data.ad";
    front.send("write_file", path, FILE, "", authReload);
}

cancelAuth.onclick = () => modalWin.style.display = "none";