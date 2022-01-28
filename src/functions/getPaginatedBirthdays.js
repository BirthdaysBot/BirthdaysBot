const { User } = require("discord.js");

const months = {
    1: "january",
    2: "february",
    3: "march",
    4: "april",
    5: "may",
    6: "june",
    7: "july",
    8: "august",
    9: "september",
    10: "october",
    11: "november",
    12: "december"
}

/**
 * Calling this function (with the correct parameters filled in) will give you a sorted (by month and day) 
 * list of birthdays for you to send into the channel.
 * @param {Number} page The page number you're fetching.
 * @param {Number} per_page The amount of birthdays per page.
 * @param {Array} birthdays The array of birthdays fetched from the database (or cache).
 * @param {User} personRequesting The user who ran the command.
 * @returns A paginated list of birthdays.
 */
module.exports = (page, per_page, birthdays, personRequesting) => {
    birthdays = birthdays.sort((a, b) => {
        let n = a.month - b.month;
        if (n !== 0) {
            return n;
        }

        return a.day - b.day;
    });

    var page = page || 1,
        per_page = per_page || 5,
        offset = (page - 1) * per_page,

        paginatedItems = birthdays.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(birthdays.length / per_page);

    let end = {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: birthdays.length,
        total_pages: total_pages,
        data: paginatedItems
    };

    let content = "";

    for (var i = 0; i < end.data.length; i++) {
        if (end.data[i].opted_out == true) continue;

        let startDate = new Date();
        let birthDate = new Date(`${toUpper(months[end.data[i].month])} ${end.data[i].day}, ${new Date().getFullYear()}`);

        const numDaysBetween = function (d1, d2) {
            let diff = d1.getTime() - d2.getTime();
            return diff / (1000 * 60 * 60 * 24);
        };

        const days = numDaysBetween(birthDate, startDate);

        const getYear = () => {
            if (end.data[i].year == 0) {
                return "0000";
            } else {
                return end.data[i].year;
            }
        }

        let formattedBirthday = `${end.data[i].day} ${toUpper(months[end.data[i].month])}, ${getYear()}`;

        if (end.data[i].user_id == personRequesting.id) {
            content += `${getBirthdayEmoji(days)}**${end.data[i].user_name} - ${formattedBirthday}**\n`;
        } else {
            content += `${getBirthdayEmoji(days)}${end.data[i].user_name} - ${formattedBirthday}\n`;
        }
    }

    return `${content}`;
}

/**
 * 
 * @param {String} str A string.
 * @returns A string with the first letter of every word capitalized.
 */
function toUpper(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(function (word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(" ");
}

/**
 * 
 * @param {Number} number The parsed date.
 * @returns An emoji or nothing.
 */
function getBirthdayEmoji(number) {
    if (number <= 30 && number >= -1) {
        return ":birthday: ";
    } else {
        return "";
    }
}