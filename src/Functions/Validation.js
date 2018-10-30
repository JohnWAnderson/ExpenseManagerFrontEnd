export const UserNameField = (field)=>{
	const regex = /^[0-9a-zA-Z_-]+$/;
	if(!field.match(regex)) return false;
	else return true;
}

export const UserField = (field)=>{
	const regex = /^[a-zA-Z_ ]+$/;
	if(!field.match(regex)) return false;
	else return true;
}

export const ItemDisFeild = (field)=>{
	const regex = /^[0-9a-zA-Z_.,'" ]+$/;
	if(!field.match(regex)) return false;
	else return true;
}

export const PasswordField = (field)=>{
	const regex = /^[0-9a-zA-Z!@#$%^&*()_+-=]+$/;
	if(!field.match(regex)) return false;
	else return true;
}

export const EmailField = (field)=>{
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!field.match(regex)) return false;
	else return true;
}


