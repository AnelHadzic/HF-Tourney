package com.hfportal.api.model;

import jakarta.persistence.*;

@Entity
public class Fixture {

    @Id
    @SequenceGenerator(
            name = "fixture_id_sequence",
            sequenceName = "fixture_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "fixture_id_sequence"
    )
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "league_id")
    private League league;

    @Transient  // this annotation makes sure Hibernate doesn't try to map this to a column
    private Integer league_id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "home_team_id")
    private Team homeTeam;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "away_team_id")
    private Team awayTeam;

    private Integer homeScore;
    private Integer awayScore;

    private Boolean hasPlayed;


    public Fixture() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public Team getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(Team homeTeam) {
        this.homeTeam = homeTeam;
    }

    public Team getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(Team awayTeam) {
        this.awayTeam = awayTeam;
    }

    public Integer getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(Integer homeScore) {
        this.homeScore = homeScore;
    }

    public Integer getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(Integer awayScore) {
        this.awayScore = awayScore;
    }

    public Boolean getHasPlayed() {
        return hasPlayed;
    }

    public void setHasPlayed(Boolean hasPlayed) {
        this.hasPlayed = hasPlayed;
    }

    public Integer getLeague_id() {
        return league_id;
    }

    public void setLeague_id(Integer league_id) {
        this.league_id = league_id;
    }

    @Override
    public String toString() {
        return "Fixture{" +
                "id=" + id +
                ", league=" + league +
                ", league_id=" + league_id +
                ", homeTeam=" + homeTeam +
                ", awayTeam=" + awayTeam +
                ", homeScore=" + homeScore +
                ", awayScore=" + awayScore +
                ", hasPlayed=" + hasPlayed +
                '}';
    }
}
