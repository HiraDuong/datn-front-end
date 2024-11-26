import { Component } from '@angular/core';
import { Chat, Message } from '../../types/model/chat.type';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  // Data
  searchText = '';
  newMessage = '';


  chats: Chat[] = [
    {
      userId: 1,
      name: 'Nguyễn Văn A',
      avatar: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      status: 'Online',
      messages: [{ text: 'Hello!', fromUser: false, type: 'text' }]
    },
    {
      userId: 2,
      name: 'Lê Thị B',
      avatar: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      status: 'Offline',
      messages: [{ text: 'Bye!', fromUser: false, type: 'text' }]
    },
    {
      userId: 3,
      name: 'Trần Văn C',
      avatar: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      status: 'Online',
      messages: [{ text: 'Thank you!', fromUser: false, type: 'text' }]
    }
  ];

  activeChat: Chat = this.chats[0];
  // Filter chats based on search text
  get filteredChats() {
    return this.chats.filter(chat => chat.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  // Method to handle message sending
  sendMessage() {
    if (this.newMessage.trim()) {
      this.activeChat.messages.push({ text: this.newMessage, fromUser: true,
        type: 'text'
      });
      this.newMessage = '';
      setTimeout(() => {
        this.receiveMessage();
      }, 1000); // Simulate a delay for receiving a message
    }
  }
  sendFileMessage(fileMessage: { type: 'image' | 'file'; content: string }) {
    const message: Message = {
      ...fileMessage,
      fromUser: true,
    };
    this.activeChat.messages.push(message);
  }



  // Simulate receiving a message
  receiveMessage() {
    this.activeChat.messages.push({ text: 'Cảm ơn bạn!', fromUser: false , type: 'text'});
  }

  // Dummy methods for actions
  showInfo() {
    alert('Thông tin người dùng');
  }

  showSettings() {
    alert('Tùy chỉnh');
  }

  // Method for calling the user (simulate the call action)
  makeCall() {
    alert('Đang gọi điện...');
    // Here you can integrate actual calling functionality, e.g., using a WebRTC or API for voice calls
  }
  selectChat(chat: any) {
    this.activeChat = chat; // Cập nhật chat đang hoạt động
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Kiểm tra nếu là ảnh
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.sendFileMessage({ type: 'image', content: reader.result as string });
        };
        reader.readAsDataURL(file); // Đọc tệp dưới dạng Base64
      } else {
        // Xử lý nếu là tệp khác (nếu cần)
        this.sendFileMessage({ type: 'file', content: file.name });
      }
    }
  }
// Hiển thị giao diện emoji (giả lập hoặc triển khai thư viện emoji picker)
showEmoji(): void {
  console.log("Emoji picker opened!");
  // TODO: Thêm thư viện emoji picker nếu cần, ví dụ: ngx-emoji-mart
}

// Mở giao diện chọn file
showFilePicker(): void {
  const fileInput = document.querySelector('.file-input') as HTMLInputElement;
  fileInput.click(); // Tự động kích hoạt chọn file
}

}

