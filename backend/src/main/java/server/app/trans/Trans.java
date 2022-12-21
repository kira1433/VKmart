package server.app.trans;

import jakarta.persistence.*;
import lombok.*;
import server.app.user.User;
import server.app.item.Item;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Trans")
public class Trans {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long no;
    private Date date;
    @ManyToOne
    private User Buyer;
    @ManyToOne
    private User Seller;
    @ManyToOne
    private Item item;
}
