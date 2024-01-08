package com.hfportal.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Team {

    @Id
    @SequenceGenerator(
            name = "team_id_sequence",
            sequenceName = "team_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "team_id_sequence"
    )
    private int id;
    private String name;

    private String image;
    private int P = 0;
    private int W = 0;
    private int D = 0;
    private int L = 0;
    private int GF = 0;
    private int GA = 0;
    private int GD = 0;
    private int PTS = 0;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "league_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private League league;

    @Transient  // this annotation makes sure Hibernate doesn't try to map this to a column
    private Integer league_id;

    public Team() {
    }

    public Team(int id, String name, String image, int p, int w, int d, int l, int GF, int GA, int GD, int PTS, League league) {
        this.id = id;
        this.name = name;
        this.image = image;
        P = p;
        W = w;
        D = d;
        L = l;
        this.GF = GF;
        this.GA = GA;
        this.GD = GD;
        this.PTS = PTS;
        this.league = league;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getP() {
        return P;
    }

    public void setP(int p) {
        this.P = p;
    }

    public int getW() {
        return W;
    }

    public void setW(int w) {
        this.W = w;
    }

    public int getD() {
        return D;
    }

    public void setD(int d) {
        this.D = d;
    }

    public int getL() {
        return L;
    }

    public void setL(int l) {
        this.L = l;
    }

    public int getGF() {
        return GF;
    }

    public void setGF(int GF) {
        this.GF = GF;
    }

    public int getGA() {
        return GA;
    }

    public void setGA(int GA) {
        this.GA = GA;
    }

    public int getGD() {
        return GD;
    }

    public void setGD(int GD) {
        this.GD = GD;
    }

    public int getPTS() {
        return PTS;
    }

    public void setPTS(int PTS) {
        this.PTS = PTS;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public Integer getLeague_id() {
        return league_id;
    }

    public void setLeague_id(Integer league_id) {
        this.league_id = league_id;
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", image='" + image + '\'' +
                ", P=" + P +
                ", W=" + W +
                ", D=" + D +
                ", L=" + L +
                ", GF=" + GF +
                ", GA=" + GA +
                ", GD=" + GD +
                ", PTS=" + PTS +
                ", league=" + league +
                ", league_id=" + league_id +
                '}';
    }
}
