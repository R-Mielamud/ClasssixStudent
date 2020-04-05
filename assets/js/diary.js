const tablesAnchor = document.getElementById("diary");
const table1 = document.createElement("div");
const table2 = document.createElement("div");
const semester1 = document.createElement("h1");
const semester2 = document.createElement("h1");

semester1.className = "semester-marker";
semester1.innerHTML = "1 Cеместр";
semester2.className = "semester-marker";
semester2.innerHTML = "2 Cеместр";

tablesAnchor.appendChild(semester1);
tablesAnchor.appendChild(table1);
tablesAnchor.appendChild(semester2);
tablesAnchor.appendChild(table2);

for (const table of [table1, table2]) {
    table.className = "diary-table";

    front.send("get_subjects", subjects => {
        const sidebar = document.createElement("div");
        const tableBody = document.createElement("div");

        sidebar.className = "diary-table-subjects-sidebar";
        tableBody.className = "diary-table-body";

        front.send("get_months", months => {
            for (let mi = (table === table1 ? 0 : 4); mi < (table === table1 ? 4 : 9); mi++) {
                const month = months[mi];
                const monthBlock = document.createElement("div");
                const monthName = document.createElement("h1");
                const monthBody = document.createElement("div");

                monthName.className = "month-marker";
                monthName.innerHTML = month.name;

                monthBody.className = "diary-table-month-body";

                monthBlock.className = "diary-table-month";

                monthBlock.appendChild(monthName);
                monthBlock.appendChild(monthBody);

                tableBody.appendChild(monthBlock);

                for (let j = 1; j <= month.days; j++) {
                    const col = document.createElement("div");
                    col.id = `col-${month.number_in_year}-${j}`;
                    col.className = "diary-table-column";

                    const numGap = document.createElement("div");
                    numGap.className = "diary-table-number-gap";
                    numGap.innerHTML = j;
                    col.appendChild(numGap);

                    for (const i in subjects) {
                        const gap = document.createElement("div");
                        gap.id = `gap-${month.number_in_year}-${j}-${+i + 1}`;
                        gap.className = "diary-table-gap";
                        col.appendChild(gap);
                    }

                    monthBody.appendChild(col);
                }
            }
        });

        table.appendChild(sidebar);
        table.appendChild(tableBody);

        for (const subject of subjects) {
            const subjectGap = document.createElement("div");
            subjectGap.className = "diary-table-subject-gap";
            subjectGap.innerHTML = subject.name;
            sidebar.appendChild(subjectGap);
        }
    });
}

const toDiary = document.getElementById("toDiary");
const news = document.getElementById("news");
const diary = document.getElementById("diary");
const toMain = document.getElementById("toMain");

toDiary.onclick = () => {
    news.style.display = "none";
    diary.style.display = "block";
    toMain.style.backgroundColor = "blue";
    toDiary.style.backgroundColor = "#00A";
}

toMain.onclick = () => {
    news.style.display = "block";
    diary.style.display = "none";
    toMain.style.backgroundColor = "#00A";
    toDiary.style.backgroundColor = "blue";
}