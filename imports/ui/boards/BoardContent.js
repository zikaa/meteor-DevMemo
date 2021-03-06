import './BoardContent.html';

import { Template } from 'meteor/templating';

import { Status }  from '../../api/status.js';

//partials
import '../partials/Memo.js';
import '../partials/List/List.js';

Template.BoardContent.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('status');
	});
});

Template.BoardContent.helpers({
	//need to use function() because of the scope problem (cannot use this_id);
	//if status has id, edit mode is available
	editMode:function(){
		return Session.get("editMode") === this._id && this._id;
	}
});

Template.BoardContent.events({
	'click .toggle-status-option'(){
		if(Session.get("editMode") === this._id){
			Session.set("editMode",false);
		}else{
			Session.set("editMode",this._id);
		}
	},
});

const hooksObject = {
	onSuccess:(formType,result)=>{
		Session.set('editMode',false);
	},
}

AutoForm.hooks({
  updateStatus: hooksObject
});