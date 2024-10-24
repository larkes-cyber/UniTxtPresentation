import "@stdlib/deploy";



struct Text {
    id: Int;
    owner: Address;
    vector: Int;
    text_value: String;
    valid: Bool;
}

message AddText {
    vector: Int;
    text_value: String;
}


message UpdateText {
    id: Int;
    vector: Int;
    text_value: String;
}


message DelText {
    id: Int;
}

contract UnicueText with Deployable {
    
    id: Int;
    
    next_item_index: Int as uint32 = 1;
    
    map_text: map<Int, Text>;
    text_owner: map<Int, Address>;

    init(_id: Int) {
        self.id = _id;
    }

    get fun Id(): Int {
        return self.id;
    }

    receive(msg: AddText){
        self.mint(sender(), msg.vector, msg.text_value);
    }

    fun mint(receiver: Address, vector: Int, text_value: String) {
        require(self.next_item_index >= 0, "non-sequential Texts");
        
        self.map_text.set(self.next_item_index, Text{
            id: self.next_item_index,
            owner: receiver,
            vector: vector,
            text_value: text_value,
            valid: true
        });

        self.text_owner.set(self.next_item_index, receiver);
        
        self.next_item_index = self.next_item_index + 1;
    }

    get fun all_text(): map<Int, Text> {
        return self.map_text;
    }

    get fun next_item_index(): Int {
        return self.next_item_index;
    }

    get fun textOwner(id: Int): Address? {
        return self.text_owner.get(id);
    }


    receive(msg: UpdateText){
        self.update_text(sender(), msg.id, msg.vector, msg.text_value);
    }

    fun update_text(receiver: Address, id_text: Int, vector: Int, text_value: String): String {
        require(self.next_item_index >= 0, "non-sequential Texts");

        let old: Address? = self.textOwner(id_text);

        if(receiver == old) {
            self.map_text.set(id_text, Text{
                id: id_text,
                owner: receiver,
                vector: vector,
                text_value: text_value,
                valid: true
            });
            return "success";
        }
        return "you are not owner";
    }

    

    receive(msg: DelText){
        self.delete_text(sender(), msg.id);
    }

    fun delete_text(receiver: Address, id_text: Int): String {
        require(self.next_item_index >= 0, "non-sequential Texts");

        let old: Address? = self.textOwner(id_text);


        if(receiver == old) {
            self.map_text.set(id_text, Text{
                id: id_text,
                owner: newAddress(0, 0),
                vector: 0,
                text_value: "",
                valid: false
            });
            return "success";
        }
        return "you are not owner";
    }
}
