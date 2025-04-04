class Passenger:
    def __init__(self, plane_no, name, travel_class):
        self.plane_no = plane_no
        self.name = name
        self.travel_class = travel_class
        self.arrival_time = None
        
    def get_priority(self):
        priority_order = {
            "First Class": 1,
            "Business Class": 2,
            "Premium Economy": 3,
            "Economy Class": 4
        }
        return priority_order.get(self.travel_class, 5)