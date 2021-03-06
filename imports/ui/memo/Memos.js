import { Template } from 'meteor/templating';

import { Memos } from '../../api/memos.js';

import './Memos.html';

//partials
import '../partials/Memo.js';
import '../partials/List/List.js';
import '../partials/ViewBtn.js';
//test
import './NewMemo.js';

Template.Memos.onCreated(function(){
	Session.set("Title",{name:"Home"});

 	const self = this;
 	self.autorun(function(){
 		self.subscribe('memos');
 	});
});

Template.Memos.helpers({
	memos:()=>{
		return Memos.find({},{sort:{createdAt:-1}});
	},
	addMemo:()=>{
		return Template.instance().addMemo.get();
	},
	newMemo:()=>{
		return Session.get('newMemo');
	},
});