import tkinter as tk

class Malo:
    def __init__(self, root):
        self.root = root
        self.root.title = "Malo Documentation"
        self.root.geometry = "400x300"
        
if __name__ == "__main__":
    root = tk.Tk()
    app = Malo(root)
    root.mainloop()