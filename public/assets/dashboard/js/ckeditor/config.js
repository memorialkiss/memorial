/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'others' },
		{ name: 'basicstyles', groups: [ 'basicstyles'] },
		{ name: 'tools' },
		'/',
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'paragraph',   groups: [ 'align', 'bidi', 'list', 'blocks' ] },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
	];

	config.enterMode = CKEDITOR.ENTER_BR;

	config.format_tags = 'p;h1;h2;h3;h4;pre';

	config.removeDialogTabs = 'image:advanced;link:advanced';
};
