function showRatings() {
    if (document.getElementById("loggedIn").value === "1") {
        front.send("read_file", app.getPath("userData"), "classsix_student_data.ad", content => {
            if (content !== "") {
                const data = content.split(/\r?\n/);

                front.send("is_user_exists_md5", data[0], data[1], isExists => {
                    if (isExists) {
                        gapsReload();

                        front.send("get_user_ratings", data[0], ratingSets => {
                            for (const ratingSet of ratingSets) {
                                const id = `gap-${ratingSet.month}-${ratingSet.day}-${ratingSet.subject.index}`;
                                const gap = document.getElementById(id);

                                if (gap) {
                                    if (ratingSet.rating1) {
                                        const canPutSlash = (ratingSet.rating2 || ratingSet.rating3 || ratingSet.rating4) ? "/" : "";
                                        gap.innerHTML = `<span style="color: ${ratingSet.rating1.color};">${ratingSet.rating1.value}${canPutSlash}</span>`;
                                    } 

                                    if (ratingSet.rating2) {
                                        const canPutSlash = (ratingSet.rating3 || ratingSet.rating4) ? "/" : "";
                                        gap.innerHTML += `<span style="color: ${ratingSet.rating2.color};">${ratingSet.rating2.value}${canPutSlash}</span>${canPutSlash}`;
                                    }

                                    if (ratingSet.rating3) {
                                        const canPutSlash = ratingSet.rating4 ? "/" : "";
                                        gap.innerHTML += `<span style="color: ${ratingSet.rating3.color};">${ratingSet.rating3.value}${canPutSlash}</span>`;
                                    }

                                    if (ratingSet.rating4) {
                                        gap.innerHTML += `<span style="color: ${ratingSet.rating3.color};">${ratingSet.rating3.value}</span>`;
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });
    }
}

showRatings();

function gapsReload() {
    const gaps = document.getElementsByClassName("diary-table-gap");
    for (const gap of gaps) gap.innerHTML = "";
}

gapsReload();