type Message = {
	user: string;
	content: string;
};

type Chat = {
	messages: Array<Message>;
	room: string;
};

export type { Message, Chat };
