import { Template } from 'meteor/templating';

import './List.html';

import './SingleList.js';

Template.List.helpers({
	show:function(){
		console.log(this.memos);
	}
});
