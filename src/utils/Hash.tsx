const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial: any, item) => {
        if(item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }

        return initial;
    }, {});

// window.location.hash = "";

export default hash;