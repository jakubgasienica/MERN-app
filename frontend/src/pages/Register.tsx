import { FaUser } from "react-icons/fa";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppThunk } from "../app/store";
import { authSlice } from "../features/auth/authSlice";
import { bindActionCreators } from "redux";
import { actionCreators } from "../features/index";
import type { State } from "../features/reducers/index";
import { ActionType } from "../features/actions";

type FormData = {
	name: string;
	email: string;
	password: string;
	passwordTwo: string;
};

type UserData = {
	name: string;
	email: string;
	password: string;
};

function Register() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		password: "",
		passwordTwo: "",
	});

	const state = useSelector((state: State) => state.user);
	console.log(state);
	const dispatch = useDispatch();
	const foo = useSelector((state: RootState) => state.auth);

	console.log(foo);

	const { addUser } = bindActionCreators(actionCreators, dispatch);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData(state => ({
			...state,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (formData.password !== formData.passwordTwo) {
			toast.error("password do not match");
		} else {
			const userData: UserData = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
			};

			dispatch(authSlice.actions.register(userData));
		}
	};

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser />
					Register
				</h1>
				<p>Please create account </p>
				<button onClick={() => addUser(1)}>Add user</button>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={formData.name}
							onChange={onChange}
							placeholder='Enter your name'
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={formData.email}
							onChange={onChange}
							placeholder='Enter your email'
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={formData.password}
							onChange={onChange}
							placeholder='Enter your password'
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='passwordTwo'
							name='passwordTwo'
							value={formData.passwordTwo}
							onChange={onChange}
							placeholder='Confirm your password'
							required
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
}

export { Register };
