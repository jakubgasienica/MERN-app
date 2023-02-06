import { FaUser } from "react-icons/fa";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

type FormData = {
	name: string;
	email: string;
	password: string;
	passwordTwo: string;
};

function Register() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		password: "",
		passwordTwo: "",
	});

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
		}
	};

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser />
					Register
				</h1>
				<p>Please create account</p>
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
