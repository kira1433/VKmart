package server.app.item;

import jakarta.persistence.*;
import lombok.*;
import server.app.user.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "items")
public class Item{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long code;
    private String name;
    private long price;
    private long qty;
    private long time;
    private long offer;
    @ManyToOne
    private User seller;
    private String image;
    public void update(Item item){
        this.setName(item.getName());
        this.setPrice(item.getPrice());
        this.setQty(item.getQty());
        this.setTime(item.getTime());
        this.setOffer(item.getOffer());
    }
}
