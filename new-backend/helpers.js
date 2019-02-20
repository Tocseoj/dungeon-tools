var helper_functions = {};

helper_functions.url_query_add = function (data){
	var url = data.url;
	const ent = Object.entries(data.query);
	var i = 0
	for (const [key, value] of ent) {
		if (i === 0) {
			url += `?${key}=${value}`
		}
		else {
		  url += `&${key}=${value}`
		}
		i += 1
	}
	return url
}

module.exports = helper_functions;