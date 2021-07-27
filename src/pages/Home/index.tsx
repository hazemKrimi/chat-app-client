import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Typography, Button, Input, Space } from 'antd';
import { useAppDispatch } from '../../redux/hooks';
import { createRoom, joinRoom } from '../../redux/slices/chat';
import './styles.css';

const Home = () => {
	const [newRoom, setNewRoom] = useState<string>('');
	const [existantRoom, setExistantRoom] = useState<string>('');
	const history = useHistory();
	const dispatch = useAppDispatch();

	return (
		<div className='container'>
			<Typography.Title level={2}>Welcome to this Real Time Chat Application</Typography.Title>
			<Row>
				<Col span={12}>
					<Space>
						<Input
							type='text'
							placeholder='Room to join'
							value={newRoom}
							onChange={event => setNewRoom(event.target.value)}
						/>
						<Button
							onClick={() => {
								dispatch(createRoom(newRoom));
								history.push(`/room/${newRoom}`);
							}}
						>
							Create Room
						</Button>
					</Space>
				</Col>
				<Col span={12}>
					<Space>
						<Input
							type='text'
							placeholder='Room to join'
							value={existantRoom}
							onChange={event => setExistantRoom(event.target.value)}
						/>
						<Button
							onClick={() => {
								dispatch(joinRoom(existantRoom));
								history.push(`/room/${existantRoom}`);
							}}
						>
							Join Room
						</Button>
					</Space>
				</Col>
			</Row>
		</div>
	);
};

export default Home;
