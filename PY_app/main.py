import tkinter as tk

class Malo:
    def __init__(self, root):
        self.root = root
        self.root.title("Malo Documentation")
        self.root.geometry("400x300")
        
        self.root.columnconfigure(0, weight=1)
        self.root.columnconfigure(1, weight=1)
        self.root.columnconfigure(2, weight=1)
        self.root.rowconfigure(0, weight=1)
        self.root.rowconfigure(1, weight=1)
        self.root.rowconfigure(2, weight=1)
        self.root.rowconfigure(3, weight=1)
        
        
        self.langInf_btn = tk.Button(root, 
            text="Language Info", 
            command=self.show_langInf
        )
        
        self.settings_btn = tk.Button(root, 
            text="Settings", 
            command=self.show_settings
        )
        
        self.culture_btn = tk.Button(root, 
            text="Culture", 
            command=self.show_culture
        )
        
        self.history_btn = tk.Button(root, 
            text="History", 
            command=self.show_history
        )
        
        self.langInf_btn.grid(row=1, column=1)
        self.settings_btn.grid(row=2, column=1)
        self.culture_btn.grid(row=1, column=0)
        self.history_btn.grid(row=1, column=2)
        
        self.homeTitle = tk.Label(
            text="Malo"
        )
        self.homeTitle.grid(row=0, column=1)
        
        
    def show_langInf(self):
        # code to go to next section
        pass
    
    def show_settings(self):
        # codefor settings :3
        pass
    
    def show_culture(self):
        pass
    
    def show_history(self):
        pass
        
if __name__ == "__main__":
    root = tk.Tk()
    app = Malo(root)
    root.mainloop()