package server.app.user;

import jakarta.persistence.*;
import lombok.*;
import server.app.item.Item;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long balance;
    private char type;
    private String name;
    private String email;
    private String address;
    private String phno;
    private String pswd;

    @OneToMany()
    private List<Item> cart;
    @ElementCollection
    private List<Long> qty;
}
