module.exports = {
	"tags":
	{
		"allowUnknownTags" : true
	},
	"plugins":[
		 "plugins/markdown"
		,"/srv/jsform/node_modules/tsdoc/template/plugins/TSDoc.js"
	],
	"opts":
	{
		"template"	:"/srv/jsform/node_modules/tsdoc/template",
		"recurse"	:"true"
	},
	"templates" : {
		"cleverLinks"     : false,
		"monospaceLinks"  : false
	},
	"source":
	{
		"includePattern": "(\\.d)?\\.ts$"
	},
	"markdown"  : {
		"parser"   : "gfm",
		"hardwrap" : true
	},
	"tsdoc":{
		"source"		:"/srv/jsform/packages/jsform-core/src/",
		"destination"	:"/srv/jsform/packages/jsform-core/docz",
		"tutorials"		:"",
		"systemName"	: "jsform-core",
		"footer"		: "",
		"copyright"		: "jsform-core Copyright © 2019 NICK.",
		"outputSourceFiles" : true,
		"commentsOnly": true
	}
}
