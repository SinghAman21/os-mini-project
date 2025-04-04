import tkinter as tk
from tkinter import ttk, messagebox
from passenger import Passenger
from datetime import datetime

class FlightCheckInSystem:
    def __init__(self, root):
        self.root = root
        self.root.title("Flight Check-in System")
        self.root.geometry("1000x700")
        self.root.configure(bg='#f0f0f0')
        
        self.passengers = []
        self.create_widgets()

    def create_widgets(self):
        # Main container
        main_container = ttk.Frame(self.root, padding="20")
        main_container.grid(row=0, column=0, sticky="nsew")
        
        # Input Frame
        input_frame = ttk.LabelFrame(main_container, text="Passenger Check-in Form", padding="20")
        input_frame.grid(row=0, column=0, padx=10, pady=10, sticky="nsew")
        
        # Style configuration
        style = ttk.Style()
        style.configure('TLabel', font=('Arial', 10))
        style.configure('TButton', font=('Arial', 10, 'bold'))
        
        # Labels and Entries with better spacing
        ttk.Label(input_frame, text="Flight Number:").grid(row=0, column=0, padx=10, pady=10, sticky="e")
        self.plane_no_entry = ttk.Entry(input_frame, width=30)
        self.plane_no_entry.grid(row=0, column=1, padx=10, pady=10)
        
        ttk.Label(input_frame, text="Passenger Name:").grid(row=1, column=0, padx=10, pady=10, sticky="e")
        self.name_entry = ttk.Entry(input_frame, width=30)
        self.name_entry.grid(row=1, column=1, padx=10, pady=10)
        
        ttk.Label(input_frame, text="Travel Class:").grid(row=2, column=0, padx=10, pady=10, sticky="e")
        self.travel_class = ttk.Combobox(input_frame, 
                                       values=["First Class", "Business Class", 
                                              "Premium Economy", "Economy Class"],
                                       width=27)
        self.travel_class.grid(row=2, column=1, padx=10, pady=10)
        
        # Check-in Button with better styling
        check_in_btn = ttk.Button(input_frame, text="Check In Passenger", command=self.check_in)
        check_in_btn.grid(row=3, column=0, columnspan=2, pady=20)
        
        # Queue Display with better organization
        queue_frame = ttk.LabelFrame(main_container, text="Current Check-in Queue", padding="20")
        queue_frame.grid(row=1, column=0, padx=10, pady=10, sticky="nsew")
        
        # Configure columns with better widths
        columns = ("Flight No", "Passenger Name", "Travel Class", "Check-in Time")
        self.queue_tree = ttk.Treeview(queue_frame, columns=columns, show="headings", height=15)
        
        # Configure column widths and headings
        widths = [100, 200, 150, 150]
        for col, width in zip(columns, widths):
            self.queue_tree.heading(col, text=col)
            self.queue_tree.column(col, width=width)
        
        self.queue_tree.grid(row=0, column=0, sticky="nsew")
        
        # Scrollbar with better integration
        scrollbar = ttk.Scrollbar(queue_frame, orient="vertical", command=self.queue_tree.yview)
        scrollbar.grid(row=0, column=1, sticky="ns")
        self.queue_tree.configure(yscrollcommand=scrollbar.set)
        
        # Configure grid weights for better resizing
        self.root.grid_rowconfigure(0, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        main_container.grid_columnconfigure(0, weight=1)
        queue_frame.grid_columnconfigure(0, weight=1)
    def check_in(self):
        plane_no = self.plane_no_entry.get()
        name = self.name_entry.get()
        travel_class = self.travel_class.get()
        
        if not all([plane_no, name, travel_class]):
            messagebox.showerror("Error", "Please fill all fields!")
            return
            
        passenger = Passenger(plane_no, name, travel_class)
        passenger.arrival_time = datetime.now()
        self.passengers.append(passenger)
        
        # Sort passengers by flight number first, then by class priority and arrival time
        self.passengers.sort(key=lambda x: (x.plane_no, x.get_priority(), x.arrival_time))
        
        # Update display
        self.update_queue_display()
        
        # Clear entries
        self.plane_no_entry.delete(0, tk.END)
        self.name_entry.delete(0, tk.END)
        self.travel_class.set("")
        
    def update_queue_display(self):
        # Clear current display
        for item in self.queue_tree.get_children():
            self.queue_tree.delete(item)
            
        # Add sorted passengers to display
        for passenger in self.passengers:
            self.queue_tree.insert("", "end", values=(
                passenger.plane_no,
                passenger.name,
                passenger.travel_class,
                passenger.arrival_time.strftime("%H:%M:%S")
            ))

if __name__ == "__main__":
    root = tk.Tk()
    app = FlightCheckInSystem(root)
    root.mainloop()