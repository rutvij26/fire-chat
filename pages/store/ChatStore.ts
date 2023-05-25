import { DocumentData, Firestore, doc, getDoc } from 'firebase/firestore';
import { action, computed, makeObservable, observable } from 'mobx';

interface chat {
    users: string[];
    conversation: Record<string, string>;
}

const ChatStore = {
    activeId: '' as string,
    activeEmail: '' as string,
    activeChat: {} as DocumentData,
    setActiveChatIdEmail(id: string, email: string, db: Firestore) {
        this.activeId = id;
        this.activeEmail = email;
        const loadChat = async () => {
            const chatRef = doc(db, 'chats', this.activeId);
            try {
                const result = (await getDoc(chatRef)).data();
                result && this.setActiveChat(result);
            } catch (err) {
                console.error('Error Loading Chat : ', err);
            }
        };
        if (this.activeId.length > 0) {
            loadChat();
        }
    },
    setActiveChat(chat: DocumentData) {
        this.activeChat = chat;
    },
};

makeObservable(ChatStore, {
    activeId: observable,
    activeEmail: observable,
    activeChat: observable,
    setActiveChat: action,
    setActiveChatIdEmail: action,
});

export default ChatStore;
