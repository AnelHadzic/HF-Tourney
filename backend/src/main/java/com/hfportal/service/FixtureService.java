package com.hfportal.service;

import com.hfportal.api.model.Fixture;
import com.hfportal.api.model.League;
import com.hfportal.api.model.Team;
import com.hfportal.api.repository.FixtureRepository;
import com.hfportal.api.repository.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FixtureService {

    @Autowired
    private FixtureRepository fixtureRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    // READ: Get all Fixtures
    public List<Fixture> findAllFixtures() {
        return fixtureRepository.findAll();
    }

    // CREATE: Add a new Fixture
    public Fixture addFixture(Fixture fixture) {
        if(fixture.getLeague_id() != null) {
            League league = leagueRepository.findById(fixture.getLeague_id())
                    .orElseThrow(() -> new RuntimeException("League not found for ID: " + fixture.getLeague_id()));
            fixture.setLeague(league);
        }
        return fixtureRepository.save(fixture);
    }

    // READ: Get a specific Fixture by ID
    public Optional<Fixture> findFixtureById(int id) {
        return fixtureRepository.findById(id);
    }

    public List<Fixture> findFixturesByLeagueId(int leagueId) {
        return fixtureRepository.findByLeagueId(leagueId);
    }

    // UPDATE: Modify an existing Fixture
    public Fixture updateFixture(Fixture fixture) {
        if (fixtureRepository.existsById(fixture.getId())) {
            Fixture existingFixture = fixtureRepository.findById(fixture.getId()).get();

            if (fixture.getHomeScore() != null) {
                existingFixture.setHomeScore(fixture.getHomeScore());
            }
            if (fixture.getAwayScore() != null) {
                existingFixture.setAwayScore(fixture.getAwayScore());
            }
            if (fixture.getHasPlayed() != null) {
                existingFixture.setHasPlayed(fixture.getHasPlayed());
            }
            // ... Add similar logic for other fields you might want to update ...

            return fixtureRepository.save(existingFixture);
        } else {
            throw new RuntimeException("Fixture not found for ID: " + fixture.getId());
        }
    }

    // DELETE: Remove a Fixture by ID
    public void deleteFixture(int id) {
        fixtureRepository.deleteById(id);
    }
}
