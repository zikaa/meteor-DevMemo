import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Memos } from './memos.js';

export const Status = new Mongo.Collection('status');

Status.allow({
	update:function(userId,doc){
		return !!userId;
	},
	remove:function(userId,doc){
		Memos.update({statusId:doc._id},{
			$unset:{statusId:""}
		},{multi:true});
		return !!userId;
	}
});

var Schemas = {};

Schemas.status = new SimpleSchema({
	name:{
		type:String,
		label:"name",
		max:20
	},
	createdAt:{
		type:Date,
		autoValue:function(){
			return new Date();
		},
		autoform:{
			type:"hidden"
		}
	},
	owner:{
		type:String,
		autoValue:function(){
			return Meteor.userId();
		},
		autoform:{
			type:"hidden"
		}
	},
	username:{
		type:String,
		autoValue:function(){
			return Meteor.user().username;
		},
		autoform:{
			type:"hidden"
		}
	}
});

Status.attachSchema(Schemas.status);
Meteor.methods({
	'addStatus'(name){
		check(name,String);

		Status.insert({
			name,
			createdAt:new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	'removeStatus'(id){
		check(id,String);

		Status.remove(id);
		Memos.update({statusId:id},
		{
			$unset:{statusId:""}
		});
	}
});

Status.helpers({
	memos(){
		return Memos.find({statusId:this._id});
	},
});