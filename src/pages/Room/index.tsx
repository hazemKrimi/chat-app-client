import { useState } from 'react';
import { Button, Card, Col, Input, Row, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Message } from '../../redux/types';
import { sendMessage } from '../../redux/slices/chat';
import './styles.css';

const Room = () => {
	const [user, setUser] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const messages = useAppSelector<Array<Message>>(state => state.chat.messages);
	const room = useAppSelector<string>(state => state.chat.room);
	const dispatch = useAppDispatch();

	return (
		<div className='container'>
			<Row>
				{messages &&
					Array.from(messages)
						.reverse()
						.map((msg: Message) => (
							<Col span={24} key={msg.content} className='message'>
								<Card>
									<Typography.Text>{msg.user}</Typography.Text>
									<Typography.Title level={3}>{msg.content}</Typography.Title>
								</Card>
							</Col>
						))}
				<div className='messaging-bar'>
					<Col span={24}>
						<Space size='large'>
							<Input
								size='large'
								type='text'
								placeholder='Username'
								value={user}
								onChange={event => setUser(event.target.value)}
							/>
							<Input
								size='large'
								type='text'
								placeholder='Message'
								value={message}
								onChange={event => setMessage(event.target.value)}
							/>
							<Button
								size='large'
								onClick={() => {
									dispatch(sendMessage({ room, message: { user, content: message } }));
									setMessage('');
								}}
							>
								Send
							</Button>
						</Space>
					</Col>
				</div>
			</Row>
		</div>
	);
};

export default Room;
